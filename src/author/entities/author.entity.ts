import { AlbumEntity } from 'src/album/entities/album.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  file: FileEntity;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @OneToMany(() => MusicEntity, (musics) => musics.artist)
  musics: MusicEntity[];

  @Column({ type: 'varchar' })
  biography: string;

  @OneToMany(() => AlbumEntity, (album) => album.author)
  albums: AlbumEntity[];

  @Column({ nullable: true })
  albumsId: number;

  @Column({ nullable: true })
  releaseDate: string;

  @Column({ default: 0 })
  totalListenCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

