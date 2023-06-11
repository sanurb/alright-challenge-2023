import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAnnotationDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  page: number;
}
