import { ListenEntity } from "src/listen/entities/listen.entity";
import { PlaylistEntity } from "src/playlist/entities/playlist.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Role } from "../enum/roles.enum";

@Entity()

export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string

  @Column({ select: false })
  password: string

  @Column({
    type: "enum",
    enum: Role,
    default: Role.User
  })

  @OneToMany(() => ListenEntity, (listen) => listen.user)
  listens: ListenEntity;

  @ManyToMany(() => PlaylistEntity, (playlists) => playlists.users)
  playlists: PlaylistEntity[]
  static password: Promise<string>;

}
