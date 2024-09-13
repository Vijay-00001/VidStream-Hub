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
import { DocsService } from './docs.services';
import { Docs } from './docs.entity';

@Controller('/api/docs-info-user')
@UseFilters(CustomException)
export class DocsController {
  constructor(private readonly documentService: DocsService) {}

  @Get('/user/all')
  @UseGuards(AuthGuard('jwt'))
  getAllDocsByUser(@Req() req) {
    return this.documentService.getAllPrivateDocs(req.user._id);
  }

  @Get('/')
  getAllVideos() {
    return this.documentService.getAllDocs();
  }

  @Get('/:id')
  getDocById(@Param('id') doc_id: string) {
    return this.documentService.getDocById(doc_id);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  addVideo(@Req() req, @Body() body: Docs) {
    return this.documentService.uploadDocInfo(req.user.email, body);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  updateVideo(@Param('id') doc_id: string, @Body() body: Docs) {
    return this.documentService.updateDocsInfo(doc_id, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteVideo(@Req() req, @Param('id') doc_id: string) {
    return this.documentService.deleteDocsInfo(req.user.email, doc_id);
  }
}
