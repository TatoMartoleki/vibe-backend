import { AlbumEntity } from "src/album/entities/album.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "files"})
export class FileEntity{

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => AlbumEntity, (album) => album.file)
    albumPhotos: AlbumEntity;

    // @OneToOne(() => AlbumEntity, (album) => album.fileId)
    // @JoinColumn()
    // albumPhotos: AlbumEntity

    // @OneToOne(() => AlbumEntity, (album) => album.file )
    // @JoinTable()
    // album: AlbumEntity;

    @Column()
    url: string

    @Column()
    key: string

    @Column()
    bucket: string

    @Column()
    fileName: string
}