import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post('sign-up')
  async signUp(@Body() body: AuthDto) {
    console.log(body);
  }

  @HttpCode(200)
  @Post('sign-in')
  async signIn(@Body() body: AuthDto) {
    console.log(body);
  }
}
