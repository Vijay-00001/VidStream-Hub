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
import { PhotoService } from './photo.services';
import { Photo } from './photo.entity';

@Controller('/api/photo-info-user')
@UseFilters(CustomException)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get('/user/all')
  @UseGuards(AuthGuard('jwt'))
  getAllPhotoByUser(@Req() req) {
    return this.photoService.getAllPrivatePhoto(req.user._id);
  }

  @Get('/')
  getAllPhotos() {
    return this.photoService.getAllPhotos();
  }

  @Get('/:id')
  getPhotoById(@Param('id') doc_id: string) {
    return this.photoService.getPhotoById(doc_id);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  addPhoto(@Req() req, @Body() body: Photo) {
    return this.photoService.uploadPhotoInfo(req.user.email, body);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  updatePhoto(@Param('id') doc_id: string, @Body() body: Photo) {
    return this.photoService.updatePhotoInfo(doc_id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deletePhoto(@Req() req, @Param('id') doc_id: string) {
    return this.photoService.deletePhotoInfo(req.user.email, doc_id);
  }
}
