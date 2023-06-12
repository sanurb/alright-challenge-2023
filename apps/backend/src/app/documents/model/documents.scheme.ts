import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { DocumentStatus } from '../dto/document-status.enum';

export type DocumentDocument = DocumentModel & Document;

@Schema({ timestamps: true })
export class DocumentModel {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, required: true, enum: DocumentStatus })
  status: DocumentStatus;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ReviewModel' }] })
  reviews: Types.ObjectId[];
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentModel);
