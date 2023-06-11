import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AnnotationDocument = AnnotationModel & Document;

@Schema({ timestamps: true })
export class AnnotationModel {
  @Prop({ required: true, type: Types.ObjectId, ref: 'UserModel' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  page: number;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;
}
export const AnnotationSchema = SchemaFactory.createForClass(AnnotationModel);
