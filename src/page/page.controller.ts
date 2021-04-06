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
import { FindPageDto } from './dto/find-top-page.dto';
import { PageModel } from './page.model';

@Controller('page')
export class PageController {
  @Post()
  async create(@Body() body: Omit<PageModel, '_id'>) {
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
  async put(@Param('id') id: string, @Body() body: PageModel) {
    console.log(id, body);
  }

  @HttpCode(200)
  @Post()
  async find(@Body() body: FindPageDto) {
    console.log(body);
  }
}
