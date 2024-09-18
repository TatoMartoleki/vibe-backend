import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlaylistEntity } from "../entities/playlist.entity";
import { Repository } from "typeorm";
import { CreatePlaylistDto } from "../dto/create-playlist.dto";
import { UpdateListenDto } from "src/listen/dto/update-listen.dto";

@Injectable()
export class PlaylistRepository {
    constructor(@InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>) { }

    async create(createPlaylistDto: CreatePlaylistDto) {
        return await this.playlistRepository
            .createQueryBuilder()
            .insert()
            .values(createPlaylistDto)
            .execute()
    }

    async findAll() {
        return await this.playlistRepository
            .createQueryBuilder()
            .getMany()
    }

    async findOne(id: number) {
        return await this.playlistRepository
            .createQueryBuilder()
            .where('id = :id', { id })
            .getOne()
    }

    async update(id: number, updateListenDto: UpdateListenDto) {
        return await this.playlistRepository
            .createQueryBuilder()
            .update(PlaylistEntity)
            .set(updateListenDto)
            .where('id = :id', { id })
    }

    async remove(id: number) {
        return await this.playlistRepository
            .createQueryBuilder()
            .delete()
            .from(PlaylistEntity)
            .where('id = :id', { id })
            .execute()
    }

}