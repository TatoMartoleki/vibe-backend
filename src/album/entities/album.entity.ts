import { AuthorEntity } from 'src/author/entities/author.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
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
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  releaseDate: string;

  @ManyToMany(() => MusicEntity, (music) => music.albums)
  @JoinTable() 
  musics: MusicEntity[];

  @Column({ type: 'int' })
  artistId: number;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  file: FileEntity;

  @ManyToOne(() => AuthorEntity, (author) => author.albums)
  @JoinColumn({ name: 'artist' })
  author: AuthorEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
