import { IsOptional } from 'class-validator';

export class UpdateAnnotationDto {
  @IsOptional()
  content: string;

  @IsOptional()
  page: number;
}
