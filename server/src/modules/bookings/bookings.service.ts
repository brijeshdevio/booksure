import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PRISMA_CODES } from 'src/common/constants';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateBookingDto } from './dto/create-booking.dto';

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
}
