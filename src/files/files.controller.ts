import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileEntity } from './entities/file.entity';

@Controller('files')
@ApiTags("files")
@ApiBearerAuth()
export class FilesController {

    constructor(private readonly filesService: FilesService) { }

    @Roles(RoleEnum.admin)
    @ApiOperation({summary: 'Upload a file by album, music or author unique id'})
    @ApiResponse({
        status: 201,
        description: "The file has been succesfuly uploaded",
        type: FileEntity,
        example: {
            firstName: 'Daviti',
            lastName: 'Shengelia',
            biography: 'magali biwi',
            file: {
              id: "unique id",
              url: 'url of a file',
              key: 'key address',
              bucket: 'bucket address',
              fileName: 'file address'
            },
            albumsId: null,
            releaseDate: null,
            id: 27,
            totalListenCount: 0,
            createdAt: '2024-10-18T14:43:34.357Z',
            updatedAt: '2024-10-18T14:43:34.357Z',
            deletedAt: null
          }

    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File,
        @Body('title') title: string,) {
        console.log(title);
        return this.filesService.uploadFile(file)
    }



    @ApiOperation({summary: 'Get a file by album, music or author unique id'})
    @ApiResponse({
        status: 201,
        description: "The file has been succesfuly uploaded",
        type: FileEntity,
        example: {
            firstName: 'Daviti',
            lastName: 'Shengelia',
            biography: 'magali biwi',
            file: {
              id: "unique id",
              url: 'url of a file',
              key: 'key address',
              bucket: 'bucket address',
              fileName: 'file address'
            },
            albumsId: null,
            releaseDate: null,
            id: 27,
            totalListenCount: 0,
            createdAt: '2024-10-18T14:43:34.357Z',
            updatedAt: '2024-10-18T14:43:34.357Z',
            deletedAt: null
          }

    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    @Post('upload')
    @Roles(RoleEnum.admin, RoleEnum.user)
    @Get('id')
    getFile(@Param(':id') id: number) {
        return this.filesService.getFile(id)
    }

}
