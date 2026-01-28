import { MusicEntity } from 'src/music/entities/music.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ListenEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MusicEntity, (music) => music.listenCounter)
  music: MusicEntity;

  @Column()
  musicId: number;

  @Column({ default: 0 })
  counter: number;

  @ManyToOne(() => UserEntity, (user) => user.listens)
  user: UserEntity;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}

