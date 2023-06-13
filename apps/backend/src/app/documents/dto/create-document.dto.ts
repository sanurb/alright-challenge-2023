import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { DocumentStatus } from './document-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsEnum(DocumentStatus)
  status: DocumentStatus;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsUUID(4, { each: true })
  reviewers: string[];

  @ApiProperty()
  @IsDate()
  createdAt?: Date;
}
