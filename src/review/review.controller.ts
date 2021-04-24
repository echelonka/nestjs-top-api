import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { PRODUCT_REVIEWS_NOT_FOUND, REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @ApiTags('Review')
  @Post()
  @ApiCreatedResponse({ type: ReviewModel })
  async create(@Body() body: CreateReviewDto) {
    return this.reviewService.create(body);
  }

  @ApiTags('Review')
  @Delete(':id')
  @ApiNotFoundResponse({ schema: { example: { statusCode: 404, message: REVIEW_NOT_FOUND } } })
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @ApiTags('Review')
  @Get('product/:productId')
  @ApiNotFoundResponse({ schema: { example: { statusCode: 404, message: PRODUCT_REVIEWS_NOT_FOUND } } })
  async getByProduct(@Param('productId') productId: string) {
    const products = await this.reviewService.findByProductId(productId);
    if (!products) {
      throw new HttpException(PRODUCT_REVIEWS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return products;
  }

  @ApiTags('Review')
  @Delete('product/:productId')
  @ApiNotFoundResponse({ schema: { example: { statusCode: 404, message: PRODUCT_REVIEWS_NOT_FOUND } } })
  async deleteByProductId(@Param('productId') productId: string) {
    const deleteResult = await this.reviewService.deleteByProductId(productId);
    if (!deleteResult) {
      throw new HttpException(PRODUCT_REVIEWS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deleteResult.deletedCount;
  }
}
