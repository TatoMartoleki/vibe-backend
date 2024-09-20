import { AlbumEntity } from "src/album/entities/album.entity";
import { MusicEntity } from "src/music/entities/music.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "files"})
export class FileEntity{

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => AlbumEntity, (album) => album.file)
    albumPhotos: AlbumEntity;

    @OneToOne(() => MusicEntity, (music) => music.file)
    musicPhotos: MusicEntity;

    @OneToOne(() => MusicEntity, (artist) => artist.file)
    artistPhotos: MusicEntity;

    @Column()
    url: string

    @Column()
    key: string

    @Column()
    bucket: string

    @Column()
    fileName: string
}