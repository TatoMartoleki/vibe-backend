import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ListenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  musicId: number;

  @Column({ default: 0 })
  counter: number;
}
