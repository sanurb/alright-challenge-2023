import { Injectable } from '@nestjs/common';
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
    return this.annotationModel.findById(id);
  }

  async update(id: string, updateAnnotationDto: UpdateAnnotationDto) {
    return this.annotationModel.findByIdAndUpdate(id, updateAnnotationDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.annotationModel.findByIdAndRemove(id);
  }
}
