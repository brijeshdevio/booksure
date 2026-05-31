import { BadRequestException, Injectable } from '@nestjs/common';

import { SlotQueryDto } from '../../common/dto/slot-query.dto';
import { PrismaService } from '../../prisma/prisma.service';

type WorkingHours = {
  start: string;
  end: string;
  slotDuration: number;
  days: number[];
};

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  async getShop(slug: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { slug },
      omit: {
        ownerId: true,
      },
    });

    if (!shop) {
      throw new BadRequestException(`Could not find shop for ${slug}.`);
    }

    return shop;
  }

  async getSlots(slug: string, query: SlotQueryDto) {
    const shop = await this.getShop(slug);

    const workingHours = shop.workingHours as WorkingHours;

    const date = new Date(query.date || new Date().toISOString());

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const currentDay = dayStart.getDay();

    if (!workingHours.days.includes(currentDay)) {
      return [];
    }

    const [startHour, startMinute] = workingHours.start.split(':').map(Number);

    const [endHour, endMinute] = workingHours.end.split(':').map(Number);

    const workingStart = new Date(dayStart);
    workingStart.setHours(startHour, startMinute, 0, 0);

    const workingEnd = new Date(dayStart);
    workingEnd.setHours(endHour, endMinute, 0, 0);

    const bookings = await this.prisma.booking.findMany({
      where: {
        shopId: shop.id,
        scheduledAt: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      select: {
        scheduledAt: true,
      },
    });

    const bookedSlots = new Set(
      bookings.map((b) => b.scheduledAt.toISOString()),
    );

    const slots: string[] = [];

    let current = new Date(workingStart);

    while (current < workingEnd) {
      const slotEnd = new Date(
        current.getTime() + workingHours.slotDuration * 60000,
      );

      if (slotEnd > workingEnd) {
        break;
      }

      const iso = current.toISOString();

      if (!bookedSlots.has(iso)) {
        slots.push(iso);
      }

      current = slotEnd;
    }

    return { date, slots };
  }
}
