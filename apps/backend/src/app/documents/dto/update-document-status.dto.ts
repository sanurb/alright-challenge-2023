import { IsEnum, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';
import { DocumentStatus } from './document-status.enum';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(DocumentStatus)
  @IsOptional()
  status?: DocumentStatus;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsUUID(4, { each: true })
  @IsOptional()
  reviewers?: string[];

  @IsUUID(4, { each: true })
  @IsOptional()
  annotations?: string[];
}
