import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopMusicEntity } from "../entities/top-music.entity";
import { Repository } from "typeorm";
import { ListenEntity } from "src/listen/entities/listen.entity";

@Injectable()
export class TopMusicRepository {
    constructor(@InjectRepository(ListenEntity)
    private readonly listenRepository: Repository<ListenEntity>){}

    async getTopMusic(limit: number = 10){
        return await this.listenRepository
        .createQueryBuilder('listen')
        .leftJoinAndSelect("listen.music", "music")
        .select("music.id", "id")
        .addSelect("music.name", "name")
        .addSelect("COUNT(listen.id)", "totalListens")
        .groupBy("music.id")
        .orderBy('totalListens', "DESC")
        .limit(limit)
        .getRawMany()

    }
}