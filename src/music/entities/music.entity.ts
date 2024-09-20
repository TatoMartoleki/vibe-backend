import { ListenEntity } from 'src/listen/entities/listen.entity';
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'int'})
  artistId: number;

  @Column({type: 'int'})
  duration: number;

  @OneToMany(() => ListenEntity, (listenCounter) => listenCounter.music)
  listenCounter: ListenEntity

  @ManyToMany(() => PlaylistEntity, (playlists) => playlists.musics)
  playlists: PlaylistEntity[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
