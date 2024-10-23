import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('search')
@ApiTags("search")
@ApiBearerAuth()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Roles(RoleEnum.user, RoleEnum.admin)
  @ApiOperation({summary: 'Search any album, music or artist'})
  @ApiResponse({
    status: 200,
    description: 'Successfuly searched',
    example: {
      searchField: 'Davit Shengelia'
    }
  })
  @Get()
  search(@Query('searchField') search: string){
    return this.searchService.search(search);
  }

}
