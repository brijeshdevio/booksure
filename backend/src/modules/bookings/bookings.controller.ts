import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import {
  SlotQueryDto,
  SlotsQuerySchema,
} from '../../common/dto/slot-query.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { apiResponse } from '../../common/helper/api-response';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { BookingsService } from './bookings.service';
import {
  CreateBookingDto,
  CreateBookingSchema,
} from './dto/create-booking.dto';
import { UpdateStatusDto, UpdateStatusSchema } from './dto/update-status.dto';

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

  @Patch(':bookingId/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @CurrentUser('id') ownerId: string,
    @Param('bookingId') bookingId: string,
    @Body(new ValidationPipe(UpdateStatusSchema)) body: UpdateStatusDto,
  ) {
    const booking = await this.bookingsService.updateStatus(
      ownerId,
      bookingId,
      body,
    );

    return apiResponse({
      message: 'Booking status updated successfully.',
      data: booking,
    });
  }
}
