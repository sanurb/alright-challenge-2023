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
  url: string;

  @IsUUID()
  userId: string;

  @IsDate()
  createdAt?: Date;
}
