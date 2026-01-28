import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { SearchModule } from './search/search.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ListenModule } from './listen/listen.module';
import { PlaylistModule } from './playlist/playlist.module';
import 'dotenv/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth-guard.service';
import { GenresModule } from './genres/genres.module';
import { MusicModule } from './music/music.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Data12$$',
      database: 'vibe-database',
      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,
    UsersModule,
    MusicModule,
    AuthorModule,
    AlbumModule,
    SearchModule,
    ListenModule,
    PlaylistModule,
    GenresModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}



