import { ListenEntity } from "src/listen/entities/listen.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()

export class UserEntity {

@PrimaryGeneratedColumn()
id: number;

@Column()
firstName: string

@Column()
lastName: string

@Column()
email: string

@Column({select: false})
password: string

@OneToMany(() => ListenEntity, (listen) => listen.user)
listens: ListenEntity;



}
