import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { type Response } from 'express';

import { ACCESS_COOKIE, ACCESS_TOKEN_COOKIE_TTL } from '../../common/constants';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { apiResponse } from '../../common/helper/api-response';
import { setCookie } from '../../common/helper/cookie';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { AuthService } from './auth.service';
import { LoginDto, LoginSchema } from './dto/login.dto';
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

  @Post('login')
  @HttpCode(200)
  async login(
    @Body(new ValidationPipe(LoginSchema)) body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.login(body);
    setCookie(res, ACCESS_COOKIE, accessToken, {
      maxAge: ACCESS_TOKEN_COOKIE_TTL,
    });

    return apiResponse({
      message: 'Login successful.',
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findUserById(@CurrentUser('id') ownerId: string) {
    const owner = await this.authService.getOwner(ownerId);

    return apiResponse({
      data: owner,
    });
  }
}
