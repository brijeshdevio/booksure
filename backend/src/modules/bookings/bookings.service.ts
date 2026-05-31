import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

import { PRISMA_CODES } from '../../common/constants';
import { SlotQueryDto } from '../../common/dto/slot-query.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  private async generateUniqueToken(shopId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: { shopId },
      orderBy: { tokenNumber: 'desc' },
      take: 1,
    });

    if (bookings.length === 0) {
      return 1;
    }

    return bookings[0].tokenNumber + 1;
  }

  async createBooking(data: CreateBookingDto) {
    const bookingSlot = await this.prisma.booking.findFirst({
      where: { shop: { slug: data.shopSlug }, scheduledAt: data.scheduledAt },
    });

    if (bookingSlot) {
      throw new ConflictException('Slot already taken. Please choose another.');
    }

    const shop = await this.prisma.shop.findUnique({
      where: { slug: data.shopSlug },
    });

    if (!shop) {
      throw new BadRequestException(
        `Could not find shop for ${data.shopSlug}.`,
      );
    }

    try {
      return await this.prisma.booking.create({
        data: {
          customerName: data.customerName,
          scheduledAt: data.scheduledAt,
          shopId: shop.id,
          status: 'CONFIRMED',
          tokenNumber: await this.generateUniqueToken(shop.id),
        },
        select: {
          id: true,
          tokenNumber: true,
          customerName: true,
          shop: {
            select: {
              name: true,
            },
          },
          scheduledAt: true,
          status: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.CONFLICT) {
          throw new ConflictException(
            `Slot already taken. Please choose another.`,
          );
        }
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new BadRequestException(
            `Could not find shop for ${data.shopSlug}.`,
          );
        }
      }
      throw error;
    }
  }

  async getBooking(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        tokenNumber: true,
        customerName: true,
        shop: {
          select: {
            name: true,
            address: true,
            phone: true,
          },
        },
        status: true,
        scheduledAt: true,
      },
    });

    if (!booking) {
      throw new BadRequestException(`Could not find booking for ${bookingId}.`);
    }

    return booking;
  }

  async getBookings(ownerId: string, query: SlotQueryDto) {
    const inputDate = query.date ? new Date(query.date) : new Date();

    const startOfDay = new Date(inputDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(inputDate);
    endOfDay.setHours(23, 59, 59, 999);

    const total = await this.prisma.booking.count({
      where: {
        shop: { ownerId },
        scheduledAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    const bookings = await this.prisma.booking.findMany({
      where: {
        shop: { ownerId },
        scheduledAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { scheduledAt: 'asc' },
      select: {
        id: true,
        tokenNumber: true,
        customerName: true,
        status: true,
        scheduledAt: true,
      },
    });

    return { total, date: inputDate, bookings };
  }

  async updateStatus(
    ownerId: string,
    bookingId: string,
    data: UpdateStatusDto,
  ) {
    try {
      return await this.prisma.booking.update({
        where: {
          id: bookingId,
          shop: { ownerId },
        },
        data: { status: data.status },
        select: {
          id: true,
          status: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new BadRequestException(
            `Could not find shop or booking for ${bookingId}.`,
          );
        }
      }
      throw error;
    }
  }
}
