import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface ReviewModel extends Base { }
export class ReviewModel extends TimeStamps {
  @ApiProperty()
  @prop()
  name: string;

  @ApiProperty()
  @prop()
  title: string;

  @ApiProperty()
  @prop()
  description: string;

  @ApiProperty()
  @prop()
  rating: number;

  @ApiProperty({ type: Types.ObjectId })
  @prop()
  productId: Types.ObjectId;
}
