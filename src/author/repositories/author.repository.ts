import { Injectable } from "@nestjs/common";
import { CreateAuthorDto } from "../dto/create-author.dto";
import { UpdateAuthorDto } from "../dto/update-author.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorEntity } from "../entities/author.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthorRepository {

    constructor(
        @InjectRepository(AuthorEntity)
        private authorRepositoy: Repository<AuthorEntity>
    ) {}

    async create(createAuthorDto: CreateAuthorDto){
        return await this.authorRepositoy
        .createQueryBuilder()
        .insert()
        .values(createAuthorDto)
        .execute()
    }

    async findAll(){
        return await this.authorRepositoy
        .createQueryBuilder()
        .select()
        .getMany()
    }

    async findOne(id: number){
        return await this.authorRepositoy
        .createQueryBuilder()
        .select()
        .from(AuthorEntity, "author")
        .where('author.id = :id', {id})
        .getOne()
    }

    async update(id: number, updateAuthorDto: UpdateAuthorDto){
        return await this.authorRepositoy
        .createQueryBuilder('author')
        .update()
        .set(updateAuthorDto)
        .where('id = :id', {id})
        .execute()
    }

    async remove(id){
        return await this.authorRepositoy
        .createQueryBuilder()
        .delete()
        .from(AuthorEntity)
        .where('id = :id', {id})
        .execute()
    }
}