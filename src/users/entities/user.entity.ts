import { ListenEntity } from "src/listen/entities/listen.entity";
import { PlaylistEntity } from "src/playlist/entities/playlist.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";

@Entity()

export class UserEntity {

@PrimaryGeneratedColumn()
id: number;

@Column()
firstName: string

@Column()
lastName: string

@Column()
email: string

@Column({select: false})
password: string

@OneToMany(() => ListenEntity, (listen) => listen.user)
listens: ListenEntity;

@ManyToMany(() => PlaylistEntity, (playlists) => playlists.users)
playlists: PlaylistEntity[]

}
