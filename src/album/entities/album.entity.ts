import { FileEntity } from 'src/files/entities/file.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
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

  @Column({ type: 'simple-array' })
  musics: string[];

  @Column({ type: 'int' })
  artistId: number;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  file: FileEntity;

  // @OneToOne(() => FileEntity, (fileId) => fileId.albumPhotos)
  // fileId: FileEntity

  // @OneToOne(() => FileEntity)
  // @JoinColumn()
  // file: FileEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
