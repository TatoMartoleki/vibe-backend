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
  id: number;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  photo: FileEntity;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  url: FileEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.musics)
  album: AlbumEntity;

  @ManyToOne(() => AuthorEntity, (artist) => artist.musics)
  artist: AuthorEntity;

  @Column()
  artistId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column()
  artistName: string;

  @OneToMany(() => ListenEntity, (listenCounter) => listenCounter.music)
  listenCounter: ListenEntity;

  @ManyToMany(() => PlaylistEntity, (playlists) => playlists.musics)
  playlists: PlaylistEntity[];

  @ManyToMany(() => GenreEntity, (genre) => genre.musics)
  @JoinTable({ name: 'music_genre' })
  genres: GenreEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
