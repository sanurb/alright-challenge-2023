import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDocument = ReviewModel & Document;

@Schema({ timestamps: true })
export class ReviewModel {
  @Prop({ required: true, type: Types.ObjectId, ref: 'DocumentModel' })
  documentId: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'UserModel' })
  reviewerId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'AnnotationModel' }] })
  annotations: Types.ObjectId[];
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
