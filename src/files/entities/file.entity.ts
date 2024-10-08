import { AlbumEntity } from "src/album/entities/album.entity";
import { AuthorEntity } from "src/author/entities/author.entity";
import { GenreEntity } from "src/genres/entities/genre.entity";
import { MusicEntity } from "src/music/entities/music.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "files"})
export class FileEntity{

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => AlbumEntity, (album) => album.file)
    albumPhotos: AlbumEntity;

    @OneToOne(() => MusicEntity, (music) => music.photo)
    musicPhotos: MusicEntity;
    
    @OneToOne(() => MusicEntity, (music) => music.url)
    musicMp3: MusicEntity;

    @OneToOne(() => AuthorEntity, (artist) => artist.file)
    artistPhotos: AuthorEntity;

    @OneToOne(() => GenreEntity, (genre) => genre.file)
    genre: GenreEntity;

    @Column()
    url: string

    @Column()
    key: string

    @Column()
    bucket: string

    @Column()
    fileName: string
}