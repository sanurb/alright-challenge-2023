import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { DocumentStatus } from './document-status.enum';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(DocumentStatus)
  status: DocumentStatus;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID(4, { each: true })
  reviewers: string[];

  @IsDate()
  createdAt?: Date;
}
