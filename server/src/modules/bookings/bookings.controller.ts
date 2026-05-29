import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SlotQueryDto, SlotsQuerySchema } from 'src/common/dto/slot-query.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { apiResponse } from 'src/common/helper/api-response';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

import { BookingsService } from './bookings.service';
import {
  CreateBookingDto,
  CreateBookingSchema,
} from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(
    @Body(new ValidationPipe(CreateBookingSchema)) body: CreateBookingDto,
  ) {
    const booking = await this.bookingsService.createBooking(body);

    return apiResponse({
      message: 'Booking Successfully.',
      data: booking,
    });
  }

  @Get(':bookingId')
  async getBooking(@Param('bookingId') bookingId: string) {
    const booking = await this.bookingsService.getBooking(bookingId);

    return apiResponse({
      data: booking,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getBookings(
    @CurrentUser('id') ownerId: string,
    @Query(new ValidationPipe(SlotsQuerySchema)) query: SlotQueryDto,
  ) {
    const data = await this.bookingsService.getBookings(ownerId, query);

    return apiResponse({
      data,
    });
  }
}
