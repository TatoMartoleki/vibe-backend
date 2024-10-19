import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { request } from 'http';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaylistEntity } from './entities/playlist.entity';

@Controller('playlist')
@ApiTags("playlists")
@ApiBearerAuth()
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) { }

  
  
  @Roles(RoleEnum.admin, RoleEnum.user)
  @ApiOperation({summary: 'Create a new Playlst'})
  @ApiResponse({
    status: 200,
    description: 'Successfully created a playlist',
    type: PlaylistEntity
  })
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.create(createPlaylistDto, userId);
  }

  
  @Roles(RoleEnum.admin, RoleEnum.user)
  @ApiResponse({
    status: 200,
    description: 'Successfully got musics  by Id',
    type: PlaylistEntity
  })
  @ApiOperation({summary: 'Get a Playlst musics by Id'})
  @Get("musics/:id")
  async findMusicFromPlaylist(@Req() request, @Param("id") id: string){
    const userId = request.user.userId
    return await this.playlistService.findMusicFromPlaylist(userId, +id);
  }


  
  @Roles(RoleEnum.admin, RoleEnum.user)
  @ApiOperation({summary: 'Get all Playlsts'})
  @ApiResponse({
    status: 200,
    description: 'Successfully got all playlists',
    type: PlaylistEntity
  })
  @Get()
  async findAll(@Req() request) {
    const userId = request.user.userId
    return await this.playlistService.findAll(userId);
  }

  @Roles(RoleEnum.admin)
  @ApiResponse({
    status: 200,
    description: 'Successfully got all playlists of any user by userId',
    type: PlaylistEntity
  })
  @ApiOperation({summary: 'Get all playlists of any user by userId'})
  @Get('admin/:userId')
  async adminFindAll(@Param('userId') userId: string){
    return await this.playlistService.findAll(+userId)
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @ApiResponse({
    status: 200,
    description: 'Successfully got a playlist by Id',
    type: PlaylistEntity
  })
  @ApiOperation({summary: 'Get a Playlst by Id'})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.playlistService.findOne(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @ApiOperation({summary: 'Update a Playlst by Id'})
  @ApiResponse({
    status: 200,
    description: 'Successfully Updated a playlist by Id',
    type: PlaylistEntity
  })
  @Patch(':playlistId')
  async update(@Param('playlistId') playlistId: string, @Body() updatePlaylistDto: UpdatePlaylistDto, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.update(+playlistId, updatePlaylistDto, userId);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @ApiOperation({summary: 'Update a Playlst by userId'})
  @ApiResponse({
    status: 200,
    description: 'Successfully updated a playlist by userId',
    type: PlaylistEntity
  })
  @Patch(':userId/edit/:playlistId')
  async editPlaylist(@Param('playlistId') playlistId: string, @Param('userId') userId: string, @Body() UpdatePlaylistDto: UpdatePlaylistDto){
    return await this.playlistService.editPlaylist(+playlistId, +userId, UpdatePlaylistDto)
  }

  @Roles(RoleEnum.user, RoleEnum.admin)
  @ApiOperation({summary: 'Add a music in playlist by playlistId and musicId'})
  @ApiResponse({
    status: 200,
    description: 'Successfully added a music in a playlist by playlistId and musicId',
    type: PlaylistEntity
  })
  @Patch(':playlistId/add/:musicId')
  async addMusic(@Param('playlistId') playlistId: string, @Param('musicId') musicId: string, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.addMusic(+playlistId, +musicId, userId)
  }

  @Roles(RoleEnum.user, RoleEnum.admin)
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted a music from a playlist by playlistId and musicId',
    type: PlaylistEntity
  })
  @ApiOperation({summary: 'Delete a music from playlist by playlistId and musicId'})
  @Patch(':playlistId/remove/:musicId')
  async removeMusic(@Param('playlistId') playlistId: string, @Param("musicId") musicId: string, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.removeMusic(+playlistId, +musicId, userId)
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted a playlist by Id',
    type: PlaylistEntity
  })
  @ApiOperation({summary: 'Delete playlist By id'})
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.remove(+id, userId);
  }

  @Roles(RoleEnum.admin)
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted a playlist by userId and playlistId',
    type: PlaylistEntity
  })
  @ApiOperation({summary: 'Delete playlist by userId and playlist Id'})
  @Delete(':userId/admin/:playlistId')
  async adminRemove(@Param('userId') userId: string, @Param('playlistId') playlistId: string){
    return await this.playlistService.adminRemove(+userId, +playlistId)
  }
}