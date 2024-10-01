import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreRepository } from './repositories/genres.repository';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class GenresService {

  constructor(private readonly genreRepository: GenreRepository) { }

  async create(createGenreDto: CreateGenreDto, file: FileEntity) {
    return await this.genreRepository.create(createGenreDto, file)
  }

  async findAll() {
    return await this.genreRepository.findAll()
  }

  async findOne(id: number) {
    return await this.genreRepository.findOne(id)
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    return await this.genreRepository.update(id, updateGenreDto)
  }

  async remove(id: number) {
    return await this.genreRepository.remove(id)
  }

  async findMusicByGenre(id: number) {
    return await this.genreRepository.findMusicByGenre(+id)
  }

  async addMusicToGenre(genreId: number, musicId: number) {
    return await this.genreRepository.addMusicToGenre(genreId, musicId);
  }
}
