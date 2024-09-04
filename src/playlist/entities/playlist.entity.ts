import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlaylistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'simple-array' })
  tracks: string[];

  @Column({ type: 'varchar' })
  userId: string;
}
