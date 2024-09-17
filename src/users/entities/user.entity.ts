import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Role } from "../enum/roles.enum";

@Entity()
export class UserEntity {

@PrimaryGeneratedColumn()
id: number;

@Column()
email: string

@Column({select: false})
password: string

@Column({type: "enum", enum: Role, default: Role.User , nullable: true})
role: Role;

}