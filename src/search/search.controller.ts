import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Roles(RoleEnum.user, RoleEnum.admin)
  @Get()
  search(@Query('searchField') search: string){
    return this.searchService.search(search);
  }

}
