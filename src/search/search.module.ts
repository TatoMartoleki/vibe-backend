import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MusicModule } from 'src/music/music.module';
import { AuthorModule } from 'src/author/author.module';
import { AlbumModule } from 'src/album/album.module';
import { PlaylistModule } from 'src/playlist/playlist.module';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [MusicModule, AuthorModule, AlbumModule, PlaylistModule],
})
export class SearchModule {}
