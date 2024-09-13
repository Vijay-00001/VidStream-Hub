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
import { VideoServices } from './video.services';
import { TypeVideos } from 'type';

@Controller('/api/video-info-user')
@UseFilters(CustomException)
export class VideoController {
  constructor(private readonly videoService: VideoServices) {}

  // This end point is used for the get all videos by user
  @Get('/user/all')
  @UseGuards(AuthGuard('jwt'))
  getAllVideosByUser(@Req() req) {
    return this.videoService.getAllPrivateVideo(req.user._id);
  }

  // This end point is used for the get all videos
  @Get('/')
  getAllVideos() {
    return this.videoService.getAllVideos();
  }

  // This end point is used for the get video
  @Get('/:id')
  getVideoById(@Param('id') videoId: string) {
    return this.videoService.getVideoById(videoId);
  }

  // This end point is used for the upload video
  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  addVideo(@Req() req, @Body() body: TypeVideos) {
    return this.videoService.uploadVideoInfo(req.user.email, body);
  }

  // This end point is used for the update video
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  updateVideo(@Param('id') videoId: string, @Body() body: TypeVideos) {
    return this.videoService.updateVideoInfo(videoId, body);
  }

  // This end point is used for the delete video
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteVideo(@Req() req, @Param('id') videoId: string) {
    return this.videoService.deleteVideoInfo(req.user.email, videoId);
  }
}
