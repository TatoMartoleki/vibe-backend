import { BadRequestException, Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { S3Service } from 'src/aws/services/s3.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly s3Service: S3Service,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    
    if(!file){
        throw new BadRequestException("Upload the file please")
    }

    const fileName = file.originalname.split('.').slice(0, -1).join('.');

    const result = await this.s3Service.upload(file, fileName);

    const savedFile = await this.filesRepository.save(
      fileName,
      result.Location,
      result.Key,
      result.Bucket,
    );

    return savedFile;
  }

  async getFile(fileId: number) {
    const file = await this.filesRepository.findOne(fileId);

    const securedUrl = await this.s3Service.getPresignedUrl(
      file.key,
      file.bucket,
    );

    file.url = securedUrl;

    return file;
  }
}
