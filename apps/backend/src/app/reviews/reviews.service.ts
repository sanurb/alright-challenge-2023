import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewDocument, ReviewModel } from './model/reviews.scheme';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewDocument>
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<ReviewDocument> {
    const review = new this.reviewModel(createReviewDto);
    await review.save();
    return review;
  }

  async findAll(): Promise<ReviewDocument[]> {
    return this.reviewModel.find().populate('annotations').exec();
  }

  async findOne(id: string): Promise<ReviewDocument> {
    const review = await this.reviewModel
      .findById(id)
      .populate('annotations')
      .orFail(new NotFoundException(`Review with id ${id} not found`));
    return review;
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto
  ): Promise<ReviewDocument> {
    const review = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .populate('annotations')
      .orFail(new NotFoundException(`Review with id ${id} not found`));
    return review;
  }

  async remove(id: string): Promise<ReviewDocument> {
    const review = await this.reviewModel
      .findByIdAndRemove(id)
      .orFail(new NotFoundException(`Review with id ${id} not found`));
    return review;
  }
}
