import { AlbumEntity } from "src/album/entities/album.entity";
import { AuthorEntity } from "src/author/entities/author.entity";
import { GenreEntity } from "src/genres/entities/genre.entity";
import { MusicEntity } from "src/music/entities/music.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "files" })
export class FileEntity {

    @ApiProperty({ description: 'The unique identifier for the file', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Album photos associated with the file', type: () => AlbumEntity })
    @OneToOne(() => AlbumEntity, (album) => album.file)
    albumPhotos: AlbumEntity;

    @ApiProperty({ description: 'Music photos associated with the file', type: () => MusicEntity })
    @OneToOne(() => MusicEntity, (music) => music.photo)
    musicPhotos: MusicEntity;
    
    @ApiProperty({ description: 'Music mp3 associated with the file', type: () => MusicEntity })
    @OneToOne(() => MusicEntity, (music) => music.url)
    musicMp3: MusicEntity;

    @ApiProperty({ description: 'Artist photos associated with the file', type: () => AuthorEntity })
    @OneToOne(() => AuthorEntity, (artist) => artist.file)
    artistPhotos: AuthorEntity;

    @ApiProperty({ description: 'Genre associated with the file', type: () => GenreEntity })
    @OneToOne(() => GenreEntity, (genre) => genre.file)
    genre: GenreEntity;

    @ApiProperty({ description: 'The URL of the file', example: 'https://example.com/file.jpg' })
    @Column()
    url: string;

    @ApiProperty({ description: 'The key of the file in the storage', example: 'file_key_123' })
    @Column()
    key: string;

    @ApiProperty({ description: 'The bucket name where the file is stored', example: 'my_bucket' })
    @Column()
    bucket: string;

    @ApiProperty({ description: 'The name of the file', example: 'file.jpg' })
    @Column()
    fileName: string;
}
