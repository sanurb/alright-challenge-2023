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
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Create a document' })
  @ApiResponse({
    status: 201,
    description: 'The document has been successfully created.',
  })
  @ApiBody({ type: CreateDocumentDto })
  create(
    @Body(ValidationPipe) dto: CreateDocumentDto
  ): Promise<DocumentDocument> {
    return this.documentsService.create(dto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('document', { storage }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a document' })
  @ApiResponse({
    status: 201,
    description: 'The document has been successfully uploaded.',
  })
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
  @ApiOperation({ summary: 'Get all documents' })
  @ApiResponse({ status: 200, description: 'Return all documents.' })
  findAll(): Promise<DocumentDocument[]> {
    return this.documentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a document by ID' })
  @ApiResponse({ status: 200, description: 'Return the document.' })
  findOne(@Param('id') id: string): Promise<DocumentDocument> {
    return this.documentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a document' })
  @ApiResponse({
    status: 200,
    description: 'The document has been successfully updated.',
  })
  @ApiBody({ type: UpdateDocumentDto })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) dto: UpdateDocumentDto
  ): Promise<DocumentDocument> {
    return this.documentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  @ApiResponse({
    status: 200,
    description: 'The document has been successfully deleted.',
  })
  remove(@Param('id') id: string): Promise<DocumentDocument> {
    return this.documentsService.remove(id);
  }
}
