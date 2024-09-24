import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TopMusicEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
