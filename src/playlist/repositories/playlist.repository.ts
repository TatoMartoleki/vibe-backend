import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlaylistEntity } from "../entities/playlist.entity";
import { Repository } from "typeorm";
import { CreatePlaylistDto } from "../dto/create-playlist.dto";
import { UpdateListenDto } from "src/listen/dto/update-listen.dto";
import { MusicEntity } from "src/music/entities/music.entity";
import { MusicRepository } from "src/music/repositories/music.repository";
import { error } from "console";


@Injectable()
export class PlaylistRepository {
    find(arg0: { where: { userId: number; }; }) {
      throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
        private readonly musicRepository: MusicRepository) { }

    async create(createPlaylistDto: CreatePlaylistDto, userId: number) {
        const playlist = this.playlistRepository.create({ ...createPlaylistDto, userId: userId })
        return await this.playlistRepository.save(playlist)
    }

    async findAll() {
        return await this.playlistRepository
            .createQueryBuilder()
            .orderBy("playlistEntity.createdAt", "DESC")
            .getMany()
    }

    async findAllFromUser(userId: number) {
        return await this.playlistRepository.find({
          where: { userId: userId }
        });
      }

    async findOne(id: number) {
        return await this.playlistRepository
            .createQueryBuilder()
            .where('id = :id', { id })
            .getOne()
    }

    async update(id: number, updateListenDto: UpdateListenDto) {
        return await this.playlistRepository
            .createQueryBuilder()
            .update(PlaylistEntity)
            .set(updateListenDto)
            .where('id = :id', { id })
    }

    async addMusic(playlistId: number, musicId: number) {
        const playlist = await this.playlistRepository.findOne({
            where: { id: playlistId },
            relations: { musics: true }
        })
                
        if (!playlist) {
            throw new NotFoundException('Playlist not found');
        }

        const music = await this.musicRepository.findOne(musicId)

        const hasMusic = playlist.musics.some(music => music.id == musicId)

        if(!hasMusic) {
            playlist.musics.push(music)
        } else {
            throw new ConflictException("Music already exists in the playlist")
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

    async removeMusic(playlistId: number, musicId: number) {
        const playlist = await this.playlistRepository.findOne({
            where: { id: playlistId },
            relations: { musics: true }
        })

        if (!playlist) {
            throw new NotFoundException('Playlist not found');
        }
    
        playlist.musics = playlist.musics.filter(m => m.id !== musicId);

        try {
            return await this.playlistRepository.save(playlist);
        } catch (err) {
            throw new InternalServerErrorException('Could not update playlist, please try again later');
        }
    }

    async remove(id: number) {
        return await this.playlistRepository
            .createQueryBuilder()
            .delete()
            .from(PlaylistEntity)
            .where('id = :id', { id })
            .execute()
    }

}