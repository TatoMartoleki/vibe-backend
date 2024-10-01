import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from '../entities/playlist.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { MusicEntity } from 'src/music/entities/music.entity';
import { MusicRepository } from 'src/music/repositories/music.repository';
import { error } from 'console';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';
import { UsersRepository } from 'src/users/users.repository';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class PlaylistRepository {

  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
    private readonly musicRepository: MusicRepository,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) { }

  async create(createPlaylistDto: CreatePlaylistDto, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    const playlist = this.playlistRepository.create({
      ...createPlaylistDto,
      users: [user],
    });
    return await this.playlistRepository.save(playlist);
  }

  async findMusicFromPlaylist(userId: number, id: number) {
    return await this.playlistRepository
      .createQueryBuilder()
      .leftJoinAndSelect("playlist.users", "users")
      .leftJoinAndSelect("playlist.musics", "musics")
      .leftJoinAndSelect('musics.photo', 'photo')
      .where('users.id = :userId', { userId })
      .andWhere("playlist.id = :id", { id })
      .getMany();
  }

  async findAll(userId: number) {
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.users', 'users')
      .leftJoinAndSelect("playlist.musics", "musics")
      .leftJoinAndSelect('musics.photo', 'photo')
      .where('users.id = :userId', { userId })
      .orderBy('playlist.createdAt', 'DESC')
      .getMany();
  }

  async adminFindAll(userId: number) {
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .where('playlist.userId = :userId', { userId })
      .orderBy('playlist.createdAt', 'DESC')
      .getMany();
  }

  async findAllFromUser(userId: number) {
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.users', 'users')
      .leftJoinAndSelect("playlist.musics", "musics")
      .leftJoinAndSelect('musics.photo', 'photo')
      .where('users.id = :userId', { userId })
      .getMany();
  }


  async findOne(id: number) {
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.musics', 'musics')
      .leftJoinAndSelect('musics.photo', 'photo')
      .where('playlist.id = :id', { id })
      .getOne();
  }

  async update(
    playlistId: number,
    UpdatePlaylistDto: UpdatePlaylistDto,
    userId: number,
  ) {
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId, users: { id: userId } },
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found or access denied');
    }

    return await this.playlistRepository
      .createQueryBuilder()
      .update(PlaylistEntity)
      .set(UpdatePlaylistDto)
      .where('id = :id', { id: playlistId })
      .execute();
  }

  async editPlaylist(
    playlistId: number,
    userId: number,
    updatePlaylistDto: UpdatePlaylistDto,
  ) {
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId, users: { id: userId } },
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found or access denied');
    }

    return await this.playlistRepository
      .createQueryBuilder()
      .update(PlaylistEntity)
      .set(updatePlaylistDto)
      .where('id = :id', { id: playlistId })
      .execute();
  }

  async addMusic(playlistId: number, musicId: number, userId: number) {
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId, users: {id: userId} },
      relations: { musics: true, users: true },
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    const music = await this.musicRepository.findOne(musicId);

    const hasMusic = playlist.musics.some((music) => music.id == musicId);

    if (!hasMusic) {
      playlist.musics.push(music);
    } else {
      throw new ConflictException('Music already exists in the playlist');
    }

    if (!music) {
      throw new NotFoundException('Music not found');
    }

    try {
      return await this.playlistRepository.save(playlist);
    } catch (err) {
      throw new ConflictException(
        'Could not update playlist, please try again later',
      );
    }
  }

  async removeMusic(playlistId: number, musicId: number, userId: number) {
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId, users: {id: userId} , },
      relations: { musics: true, users: true },
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    playlist.musics = playlist.musics.filter((m) => m.id !== musicId);


    try {
      return await this.playlistRepository.save(playlist);
    } catch (err) {
      throw new InternalServerErrorException(
        'Could not update playlist, please try again later',
      );
    }
  }

  async remove(id: number, userId: number) {
    const playlist = await this.playlistRepository.findOne({
      where: { id, users: { id: userId } },
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    return await this.playlistRepository
      .createQueryBuilder()
      .delete()
      .from(PlaylistEntity)
      .where('id = :id', { id })
      .execute();
  }

  async adminRemove(userId: number, playlistId: number) {
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId, users: { id: userId } },
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found or access denied');
    }

    return await this.playlistRepository
      .createQueryBuilder()
      .delete()
      .from(PlaylistEntity)
      .where('id = :id', { id: playlistId })
      .execute();
  }
}
