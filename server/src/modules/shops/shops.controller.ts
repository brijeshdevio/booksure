import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { apiResponse } from 'src/common/helper/api-response';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

import { CreateShopDto, CreateShopSchema } from './dto/create-shop.dto';
import { UpdateShopDto, UpdateShopSchema } from './dto/update-shop.dto';
import { ShopsService } from './shops.service';

@Controller('shops')
@UseGuards(JwtAuthGuard)
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @HttpCode(201)
  async createShop(
    @CurrentUser('id') ownerId: string,
    @Body(new ValidationPipe(CreateShopSchema)) body: CreateShopDto,
  ) {
    const shop = await this.shopsService.createShop(ownerId, body);

    return apiResponse({
      message: 'Shop created successfully.',
      data: shop,
    });
  }

  @Get('me')
  async getShop(@CurrentUser('id') ownerId: string) {
    const shop = await this.shopsService.getShop(ownerId);

    return apiResponse({ data: shop });
  }

  @Patch('me')
  @HttpCode(200)
  async updateShop(
    @CurrentUser('id') ownerId: string,
    @Body(new ValidationPipe(UpdateShopSchema)) body: UpdateShopDto,
  ) {
    const shop = await this.shopsService.updateShop(ownerId, body);

    return apiResponse({
      message: 'Shop detail updated successfully.',
      data: shop,
    });
  }
}
