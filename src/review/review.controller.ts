import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PRODUCT_REVIEWS_NOT_FOUND, REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post()
  async create(@Body() body: CreateReviewDto) {
    return this.reviewService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('product/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  @Delete('product/:productId')
  async deleteByProductId(@Param('productId') productId: string) {
    const deleteResult = await this.reviewService.deleteByProductId(productId);
    if (!deleteResult) {
      throw new HttpException(PRODUCT_REVIEWS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deleteResult.deletedCount;
  }
}
