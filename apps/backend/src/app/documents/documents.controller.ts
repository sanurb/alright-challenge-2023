import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { storage } from '../../utils/media.handle';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentDocument } from './model/documents.scheme';

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  create(
    @Body(ValidationPipe) dto: CreateDocumentDto
  ): Promise<DocumentDocument> {
    return this.documentsService.create(dto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('document', { storage }))
  upload(@UploadedFile() file) {
    console.log(file);
  }

  @Get()
  findAll(): Promise<DocumentDocument[]> {
    return this.documentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DocumentDocument> {
    return this.documentsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) dto: UpdateDocumentDto
  ): Promise<DocumentDocument> {
    return this.documentsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DocumentDocument> {
    return this.documentsService.remove(id);
  }
}
