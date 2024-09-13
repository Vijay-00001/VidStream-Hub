import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomException } from 'src/exceptions/custom.exception';
import { MusicService } from './music.services';
import { Music } from './music.entity';

@Controller('/api/music-info-user')
@UseFilters(CustomException)
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('/user/all')
  @UseGuards(AuthGuard('jwt'))
  getAllMusicByUser(@Req() req) {
    return this.musicService.getAllPrivateMusic(req.user._id);
  }

  @Get('/')
  getAllMusic() {
    return this.musicService.getAllMusic();
  }

  @Get('/:id')
  getMusicById(@Param('id') doc_id: string) {
    return this.musicService.getMusicById(doc_id);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  addMusic(@Req() req, @Body() body: Music) {
    return this.musicService.uploadMusicInfo(req.user.email, body);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  updateMusic(@Param('id') doc_id: string, @Body() body: Music) {
    return this.musicService.updateMusicInfo(doc_id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteMusic(@Req() req, @Param('id') doc_id: string) {
    return this.musicService.deleteMusicInfo(req.user.email, doc_id);
  }
}
