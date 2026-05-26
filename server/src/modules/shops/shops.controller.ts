import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { apiResponse } from 'src/common/helper/api-response';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

import { CreateShopDto, CreateShopSchema } from './dto/create-shop.dto';
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
}
