import { FileEntity } from 'src/files/entities/file.entity';
import { ListenEntity } from 'src/listen/entities/listen.entity';
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
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  file: FileEntity;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'int'})
  artistId: number;

  @Column({type: 'int'})
  duration: number;

  @OneToMany(() => ListenEntity, (listenCounter) => listenCounter.music)
  listenCounter: ListenEntity

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
