import { MusicEntity } from "src/music/entities/music.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    name: string;

    @Column({nullable: true})
    description: string;

    @ManyToMany(() => MusicEntity, (musics) => musics.playlists)
    @JoinTable({name: "playlist_music"})
    musics: MusicEntity[];


    @ManyToMany(() => UserEntity, (users) => users.playlists)
    @JoinTable({name: "playlist_user"})
    users: UserEntity[]

    @Column()
    userId: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
