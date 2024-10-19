import { MusicEntity } from 'src/music/entities/music.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ListenEntity {
  
  @ApiProperty({ description: 'The unique identifier for the listen record', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The music associated with this listen record', type: () => MusicEntity })
  @ManyToOne(() => MusicEntity, (music) => music.listenCounter)
  music: MusicEntity;

  @ApiProperty({ description: 'The unique identifier of the music', example: 123 })
  @Column()
  musicId: number;

  @ApiProperty({ description: 'The number of times the music has been listened to', example: 10, default: 0 })
  @Column({ default: 0 })
  counter: number;

  @ApiProperty({ description: 'The user associated with this listen record', type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.listens)
  user: UserEntity;

  @ApiProperty({ description: 'The unique identifier of the user', example: 456 })
  @Column()
  userId: number;

  @ApiProperty({ description: 'The date when the listen record was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date when the listen record was last updated' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'The date when the listen record was deleted' })
  @DeleteDateColumn()
  deleteAt: Date;
}

