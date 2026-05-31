import { Controller, Get, Param, Query } from '@nestjs/common';

import {
  SlotQueryDto,
  SlotsQuerySchema,
} from '../../common/dto/slot-query.dto';
import { apiResponse } from '../../common/helper/api-response';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('shops/:slug')
  async getShop(@Param('slug') slug: string) {
    const shop = await this.publicService.getShop(slug);
    return apiResponse({ data: shop });
  }

  @Get('shops/:slug/slots')
  async getSlots(
    @Param('slug') slug: string,
    @Query(new ValidationPipe(SlotsQuerySchema)) query: SlotQueryDto,
  ) {
    const slots = await this.publicService.getSlots(slug, query);
    return apiResponse({ data: slots });
  }
}
