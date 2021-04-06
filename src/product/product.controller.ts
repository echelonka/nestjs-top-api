import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
  @Post()
  async create(@Body() body: Omit<ProductModel, '_id'>) {
    console.log(body);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    console.log(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log(id);
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() body: ProductModel) {
    console.log(id, body);
  }

  @HttpCode(200)
  @Post()
  async find(@Body() body: FindProductDto) {
    console.log(body);
  }
}
