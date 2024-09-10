import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { AuthorModule } from './author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { SearchModule } from './search/search.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MusicModule,
    AuthorModule,
    AlbumModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'vibe-database.cvgmqio2ew9h.eu-north-1.rds.amazonaws.com',
      port: 3306,
      username: 'spacex',
      password: 'novatori123',
      database: 'vibedatabase',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register(
      {secret: jwtConstants .secret,
        global: true
      }
    ),
    MusicModule,
    AuthorModule,
    AlbumModule,
    SearchModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
