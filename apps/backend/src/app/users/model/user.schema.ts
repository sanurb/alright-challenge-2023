import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'DocumentModel' }] })
  documents: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'ReviewModel' }] })
  reviews: Types.ObjectId[];

  @Prop({
    default: ['user'],
  })
  roles: string[];

  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  description: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
