import { Body, Controller, Post } from '@nestjs/common';
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
}
