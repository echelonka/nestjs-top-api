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
import { ApiTags } from '@nestjs/swagger';
import { FindPageDto } from './dto/find-top-page.dto';
import { PageModel } from './page.model';

@Controller('page')
export class PageController {
  @ApiTags('Page')
  @Post()
  async create(@Body() body: Omit<PageModel, '_id'>) {
    console.log(body);
  }

  @ApiTags('Page')
  @Get(':id')
  async get(@Param('id') id: string) {
    console.log(id);
  }

  @ApiTags('Page')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log(id);
  }

  @ApiTags('Page')
  @Put(':id')
  async put(@Param('id') id: string, @Body() body: PageModel) {
    console.log(id, body);
  }

  @ApiTags('Page')
  @HttpCode(200)
  @Post()
  async find(@Body() body: FindPageDto) {
    console.log(body);
  }
}
