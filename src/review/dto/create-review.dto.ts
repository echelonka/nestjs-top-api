import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsInt, Max, Min, IsMongoId } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @Max(5)
  @Min(1)
  @IsNumber()
  @IsInt()
  rating: number;

  @ApiProperty()
  @IsMongoId()
  productId: string;
}
