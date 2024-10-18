import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';

@Controller('files')
export class FilesController {

    constructor(private readonly filesService: FilesService) { }

    @Roles(RoleEnum.admin)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File,
        @Body('title') title: string,) {
        console.log(title);
        return this.filesService.uploadFile(file)
    }

    @Roles(RoleEnum.admin, RoleEnum.user)
    @Get('id')
    getFile(@Param(':id') id: number) {
        return this.filesService.getFile(id)
    }

}
