import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
