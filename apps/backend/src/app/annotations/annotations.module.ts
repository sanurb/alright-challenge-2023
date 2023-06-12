import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnotationsController } from './annotations.controller';
import { AnnotationsService } from './annotations.service';
import { AnnotationModel, AnnotationSchema } from './model/annotations.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AnnotationModel.name,
        schema: AnnotationSchema,
      },
    ]),
  ],
  controllers: [AnnotationsController],
  providers: [AnnotationsService],
})
export class AnnotationsModule {}
