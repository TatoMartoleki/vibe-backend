import { MusicEntity } from "src/music/entities/music.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
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
}
