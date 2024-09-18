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
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { AwsModule } from './aws/aws.module';
import { APP_GUARD } from '@nestjs/core';

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
      {secret: process.env.JWT_SECRET,
        global: true
      }
    ),
    MusicModule,
    AuthorModule,
    AlbumModule,
    SearchModule,
    UsersModule,
    AuthModule,
    FilesModule,
    AwsModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
