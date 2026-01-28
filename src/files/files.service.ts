import { BadRequestException, Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { S3Service } from '../aws/services/s3.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly s3Service: S3Service,
  ) { }

  private randomName(originalName: string): string {
    const random1 = Math.random().toString(36).substring(2, 8);
    const random2 = Math.random().toString(36).substring(2, 8);
    const fileExtension = originalName.split('.').pop(); 
    return `file_${random1}_${random2}.${fileExtension}`;
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("Upload the file please");
    }

    const randomfile = this.randomName(file.originalname);

    const result = await this.s3Service.upload(file, randomfile);

    const savedFile = await this.filesRepository.save(
      randomfile,
      result.Location,
      result.Key,
      result.Bucket,
    );

    return savedFile;
  }

  async getFile(fileId: number) {
    const file = await this.filesRepository.findOne(fileId);

    if (!file) {
      throw new BadRequestException("File not found");
    }

    const securedUrl = await this.s3Service.getPresignedUrl(
      file.key,
      file.bucket,
    );

    file.url = securedUrl;

    return file;
  }
}
