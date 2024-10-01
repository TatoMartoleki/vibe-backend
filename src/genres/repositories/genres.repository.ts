import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenreEntity } from "../entities/genre.entity";
import { CreateGenreDto } from "../dto/create-genre.dto";
import { UpdateGenreDto } from "../dto/update-genre.dto";
import { Repository } from "typeorm";
import { MusicRepository } from "src/music/repositories/music.repository";
import { FileEntity } from "src/files/entities/file.entity";

@Injectable()
export class GenreRepository {
    constructor(@InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
        private readonly musicRepository: MusicRepository
    ) { }

    async create(createGenreDto: CreateGenreDto, file: FileEntity) {

        const genre = this.genreRepository.create({
            ...createGenreDto,
            file: file,
        });
        return await this.genreRepository.save(genre);
    }

    async findAll() {
        return await this.genreRepository
          .createQueryBuilder('genre')
          .leftJoinAndSelect('genre.file', 'file')
          .leftJoinAndSelect('genre.musics', 'musics')
          .leftJoinAndSelect('musics.url', 'url')
          .leftJoinAndSelect('musics.photo', 'photo')
          .getMany();
    }

    async findOne(id: number) {
        return await this.genreRepository
        .createQueryBuilder('genre')
        .where('genre.id = :id', { id })
        .leftJoinAndSelect('genre.musics', 'musics')
        .leftJoinAndSelect("musics.url", "url")
        .leftJoinAndSelect("musics.photo", "photo")
        .getOne();
    }

    async update(id: number, updateGenreDto: UpdateGenreDto) {
        return await this.genreRepository.update(id, updateGenreDto)
    }

    async remove(id: number) {
        const genre = await this.findOne(id);
        if (!genre) {
            throw new NotFoundException(`Genre with id ${id} not found`);
        }
        await this.genreRepository.remove(genre);
    }

    async findMusicByGenre(genreName: string) {
        const genre = await this.genreRepository
        .createQueryBuilder('genre')
        .leftJoinAndSelect('genre.musics', 'musics')
        .leftJoinAndSelect("musics.url", "url")
        .leftJoinAndSelect("musics.photo", "photo")
        .where('genre.name = :name', { name: genreName })
        .getOne();
        
    if (!genre) {
        throw new NotFoundException(`Genre with name ${genreName} not found`);
    }
    
    return genre;
    }

    async addMusicToGenre(genreId: number, musicId: number) {
        const genre = await this.genreRepository.findOne({
            where: { id: genreId },
            relations: ['musics'],
        });

        if (!genre) {
            throw new NotFoundException('Genre not found');
        }

        const music = await this.musicRepository.findOne(musicId);
        if (!music) {
            throw new NotFoundException('Music not found');
        }

        genre.musics.push(music);
        return await this.genreRepository.save(genre);
    }
}