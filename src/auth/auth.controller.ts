import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @ApiTags('Auth')
  @Post('sign-up')
  async signUp(@Body() body: AuthDto) {
    console.log(body);
  }

  @ApiTags('Auth')
  @HttpCode(200)
  @Post('sign-in')
  async signIn(@Body() body: AuthDto) {
    console.log(body);
  }
}
