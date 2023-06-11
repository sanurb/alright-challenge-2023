import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnnotationsService } from './annotations.service';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { UpdateAnnotationDto } from './dto/update-annotation.dto';

@ApiTags('annotations')
@Controller('annotations')
export class AnnotationsController {
  constructor(private readonly annotationsService: AnnotationsService) {}

  @Post()
  create(@Body() createAnnotationDto: CreateAnnotationDto) {
    return this.annotationsService.create(createAnnotationDto);
  }

  @Get()
  findAll() {
    return this.annotationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.annotationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnnotationDto: UpdateAnnotationDto
  ) {
    return this.annotationsService.update(+id, updateAnnotationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.annotationsService.remove(+id);
  }
}
