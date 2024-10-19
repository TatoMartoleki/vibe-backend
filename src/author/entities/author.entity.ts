import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({description: "The unique identifier of the author.", example: 1})
  id: number;

  @OneToOne(() => FileEntity)
  @JoinColumn()
  @ApiProperty({description: "The profile picture of the author."})
  file: FileEntity;

  @Column({ type: 'varchar' })
  @ApiProperty({description: "The first name of the author."})
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({description: "The last name of the author."})
  lastName: string;

  @OneToMany(() => MusicEntity, (musics) => musics.artist)
  @ApiProperty({description: "The list of music tracks created by the author."})
  musics: MusicEntity[];

  @Column({ type: 'varchar' })
  @ApiProperty({description: "The biography of the author."})
  biography: string;

  @OneToMany(() => AlbumEntity, (album) => album.author)
  @ApiProperty({description: "The list of albums created by the author."})
  albums: AlbumEntity[];

  @Column({ nullable: true })
  @ApiProperty({description: "The unique identifier of the author's albums."})
  albumsId: number;

  @Column({ nullable: true })
  @ApiProperty({description: "The release date of the author's albums."})
  releaseDate: string;

  @Column({ default: 0 })
  @ApiProperty({description: "The total number of times the author's music has been listened to."})
  totalListenCount: number;

  @CreateDateColumn()
  @ApiProperty({description: "The date and time when the author was created."})
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({description: "The date and time when the author was last updated."})
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty({description: "The date and time when the author was deleted."})
  deletedAt: Date;
}

