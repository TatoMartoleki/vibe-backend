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

  @Column()
  artistName: string;

  @ManyToMany(() => MusicEntity, (music) => music.album)
  musics: MusicEntity[];

  @OneToOne(() => FileEntity)
  @JoinColumn()
  file: FileEntity;

  @ManyToOne(() => AuthorEntity, (author) => author.albums)
  author: AuthorEntity;

  @Column()
  authorId: number;

  @Column({default: 0})
  totalListenCount: number

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
