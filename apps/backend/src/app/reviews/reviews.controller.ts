import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewDocument } from './model/reviews.scheme';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body(ValidationPipe) dto: CreateReviewDto): Promise<ReviewDocument> {
    return this.reviewsService.create(dto);
  }

  @Get()
  findAll(): Promise<ReviewDocument[]> {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ReviewDocument> {
    return this.reviewsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) dto: UpdateReviewDto
  ): Promise<ReviewDocument> {
    return this.reviewsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ReviewDocument> {
    return this.reviewsService.remove(id);
  }
}
