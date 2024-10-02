import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { MusicRepository } from 'src/music/repositories/music.repository';
import { AuthorRepository } from 'src/author/repositories/author.repository';
import { AlbumRepository } from 'src/album/repositories/album.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly musicsRepository: MusicRepository,
    private readonly authorsRepository: AuthorRepository,
    private readonly albumsRepository: AlbumRepository,
  ) {}

  async search(search: string) {
    try {
      const musics = await this.musicsRepository.findByName(search);
      const authors = await this.authorsRepository.findByName(search);
      const albums = await this.albumsRepository.findByName(search);

      

      const results = [
        ...musics.map((music) => ({ type: 'music', data: music })),
        ...authors.map((author) => ({ type: 'author', data: author })),
        ...albums.map((album) => ({ type: 'album', data: album })),
      ];      

      return results;
    } catch (err) {
      console.log(err)
    }
  }

}
