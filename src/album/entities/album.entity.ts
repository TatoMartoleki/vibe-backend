import { AuthorEntity } from 'src/author/entities/author.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the album.' })
  id: number;

  @Column({ type: 'varchar' })
  @ApiProperty({ description: 'The title of the album.' })
  title: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ description: 'The release date of the album.' })
  releaseDate: string;

  @Column()
  @ApiProperty({ description: 'The name of the artist who created the album.' })
  artistName: string;

  @OneToMany(() => MusicEntity, (musics) => musics.album)
  @ApiProperty({ description: 'The list of music tracks in the album.' })
  musics: MusicEntity[];

  @OneToOne(() => FileEntity)
  @JoinColumn()
  @ApiProperty({ description: 'The cover image of the album.' })
  file: FileEntity;

  @ManyToOne(() => AuthorEntity, (author) => author.albums)
  @ApiProperty({ description: 'The author who created the album.' })
  author: AuthorEntity;

  @Column()
  authorId: number;

  @Column({default: 0})
  @ApiProperty({ description: 'The total number of times the album has been listened to.' })
  totalListenCount: number

  @CreateDateColumn()
  @ApiProperty({ description: 'The date and time when the album was created.' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'The date and time when the album was last updated.' })
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty({ description: 'The date and time when the album was deleted.' })
  deletedAt: Date;
}

