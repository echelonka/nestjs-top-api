import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) { }

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    if (Types.ObjectId.isValid(id)) return this.reviewModel.findByIdAndDelete(id).exec();
    else return null;
  }

  async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
    return this.reviewModel.find({ productId: Types.ObjectId(productId) }).exec();
  }

  async deleteByProductId(productId: string) {
    if (Types.ObjectId.isValid(productId)) {
      return this.reviewModel.deleteMany({ productId: Types.ObjectId(productId) }).exec();
    } else {
      return null;
    }
  }
}
