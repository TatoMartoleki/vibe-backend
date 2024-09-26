import { RoleEnum } from "src/auth/enums/roles.enum";
import { ListenEntity } from "src/listen/entities/listen.entity";
import { PlaylistEntity } from "src/playlist/entities/playlist.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enum/roles.enum";

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

@Column({default: RoleEnum.user, type: "enum", enum: RoleEnum})
role: RoleEnum

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;

@DeleteDateColumn()
deletedAt: Date;

}
