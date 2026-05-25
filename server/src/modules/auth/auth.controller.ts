import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { apiResponse } from 'src/common/helper/api-response';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

import { AuthService } from './auth.service';
import { RegisterDto, RegisterSchema } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body(new ValidationPipe(RegisterSchema)) body: RegisterDto) {
    const owner = await this.authService.register(body);
    return apiResponse({
      message: 'Owner account created successfully.',
      data: owner,
    });
  }
}
