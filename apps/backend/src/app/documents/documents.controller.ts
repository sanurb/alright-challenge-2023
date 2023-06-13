import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
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
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { HasRole } from '../decorators/has-role.decorator';
import { DocumentStatus } from './dto/document-status.enum';

@ApiTags('documents')
@UseGuards(JwtGuard, RolesGuard)
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
  async upload(
    @UploadedFile() file,
    @Body() body: any
  ): Promise<DocumentDocument> {
    const dto = new CreateDocumentDto();
    dto.title = body.title;
    dto.userId = body.userId;
    dto.status = DocumentStatus.UNREVIEWED;
    dto.url = file.path;
    return this.documentsService.create(dto);
  }

  @Get()
  @HasRole('admin', 'user')
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
