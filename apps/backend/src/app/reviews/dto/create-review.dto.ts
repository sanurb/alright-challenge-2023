import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsMongoId()
  documentId: string;

  @IsNotEmpty()
  @IsMongoId()
  reviewerId: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  annotations: string[];
}
