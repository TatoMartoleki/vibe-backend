import { FileEntity } from "src/files/entities/file.entity";
import { MusicEntity } from "src/music/entities/music.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GenreEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', unique: true })
    name: string;
  
    @ManyToMany(() => MusicEntity, (music) => music.genres)
    musics: MusicEntity[];

    @OneToOne(() => FileEntity)
    @JoinColumn()
    file: FileEntity
}
