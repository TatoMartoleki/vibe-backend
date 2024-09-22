import { FileEntity } from 'src/files/entities/file.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
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

  @Column({type: 'varchar'})
  firstName: string;

  @Column({type: 'varchar'})
  lastName: string;

  @Column({ type: 'simple-array', nullable: true })
  musics: string[];

  @Column({type: 'varchar'})
  biography: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
