import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnotationDto } from './dto/create-annotation.dto';
import { UpdateAnnotationDto } from './dto/update-annotation.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  AnnotationDocument,
  AnnotationModel,
} from './model/annotations.scheme';
import { Model } from 'mongoose';

@Injectable()
export class AnnotationsService {
  constructor(
    @InjectModel(AnnotationModel.name)
    private readonly annotationModel: Model<AnnotationDocument>
  ) {}

  async create(createAnnotationDto: CreateAnnotationDto) {
    const createdAnnotation = await this.annotationModel.create(
      createAnnotationDto
    );
    return createdAnnotation;
  }

  async findAll() {
    return this.annotationModel.find().exec();
  }

  async findOne(id: string) {
    const annotation = this.annotationModel
      .findById(id)
      .orFail(new NotFoundException(`Annotation id ${id} not found`));
    return annotation;
  }

  async update(id: string, updateAnnotationDto: UpdateAnnotationDto) {
    const annotation = this.annotationModel
      .findByIdAndUpdate(id, updateAnnotationDto, {
        new: true,
      })
      .orFail(new NotFoundException(`Annotation id ${id} not found`));
  }

  async remove(id: string) {
    const annotation = this.annotationModel
      .findByIdAndRemove(id)
      .orFail(new NotFoundException(`Annotation id ${id} not found`));
    return annotation;
  }
}
