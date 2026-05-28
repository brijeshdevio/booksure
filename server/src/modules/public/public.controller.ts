import { Controller, Get, Param } from '@nestjs/common';
import { apiResponse } from 'src/common/helper/api-response';

import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('shops/:slug')
  async getShop(@Param('slug') slug: string) {
    const shop = await this.publicService.getShop(slug);
    return apiResponse({ data: shop });
  }
}
