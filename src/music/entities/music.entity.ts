import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { GenreEntity } from 'src/genres/entities/genre.entity';
import { ListenEntity } from 'src/listen/entities/listen.entity';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MusicEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({description: "The unique identifier of the music track.", example: 1})
  id: number;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  @ApiProperty({description: "The cover image of the music track."})
  photo: FileEntity;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  @ApiProperty({description: "The audio file of the music track."})
  url: FileEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.musics)
  @ApiProperty({description: "The album that the music track belongs to."})
  album: AlbumEntity;

  @ManyToOne(() => AuthorEntity, (artist) => artist.musics)
  @ApiProperty({description: "The author who created the music track."})
  artist: AuthorEntity;

  @Column()
  @ApiProperty({description: "The unique identifier of the music track's artist.", example: 1})
  artistId: number;

  @Column({ type: 'varchar' })
  @ApiProperty({description: "The name of the music track.", example: "West Coast"})
  name: string;

  @Column()
  @ApiProperty({description: "The name of the artist who created the music track.", example: "Lana Del Rey"})
  artistName: string;

  @OneToMany(() => ListenEntity, (listenCounter) => listenCounter.music)
  @ApiProperty({description: "The number of times the music track has been listened to."})
  listenCounter: ListenEntity;

  @ManyToMany(() => PlaylistEntity, (playlists) => playlists.musics)
  @ApiProperty({description: "The playlists that the music track belongs to."})
  playlists: PlaylistEntity[];

  @ManyToMany(() => GenreEntity, (genre) => genre.musics)
  @JoinTable({ name: 'music_genre' })
  @ApiProperty({description: "The genres that the music track belongs to."})
  genres: GenreEntity[];

  @CreateDateColumn()
  @ApiProperty({description: "The date and time when the music track was created."})
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({description: "The date and time when the music track was last updated."})
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty({description: "The date and time when the music track was deleted."})
  deletedAt: Date;
}

