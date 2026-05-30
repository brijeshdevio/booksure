import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(ownerId: string) {
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    // helper to convert groupBy result → map
    const toMap = (data: { status: string; _count: { status: number } }[]) => {
      const map = {
        CONFIRMED: 0,
        DONE: 0,
        CANCELLED: 0,
      };

      for (const item of data) {
        map[item.status] = item._count.status;
      }

      return map;
    };

    // TODAY (grouped)
    const todayGrouped = await this.prisma.booking.groupBy({
      by: ['status'],
      where: {
        shop: { ownerId },
        scheduledAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      _count: {
        status: true,
      },
    });

    // ALL TIME (grouped)
    const allTimeGrouped = await this.prisma.booking.groupBy({
      by: ['status'],
      where: {
        shop: { ownerId },
      },
      _count: {
        status: true,
      },
    });

    const today = toMap(todayGrouped);
    const allTime = toMap(allTimeGrouped);

    const todayTotal = today.CONFIRMED + today.DONE + today.CANCELLED;

    const allTimeTotal = allTime.CONFIRMED + allTime.DONE + allTime.CANCELLED;

    return {
      today: {
        total: todayTotal,
        confirmed: today.CONFIRMED,
        done: today.DONE,
        cancelled: today.CANCELLED,
      },
      allTime: {
        total: allTimeTotal,
        done: allTime.DONE,
        cancelled: allTime.CANCELLED,
      },
    };
  }
}
