import crypto from 'node:crypto';

import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import slugify from 'slugify';
import { PRISMA_CODES } from 'src/common/constants';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopsService {
  constructor(private readonly prisma: PrismaService) {}

  private async generateSlugAndCheck(name: string, pre: string = '') {
    const slugName = slugify(
      (name + pre.replace(/ /g, '-')).toLocaleLowerCase(),
    );

    const slug = await this.prisma.shop.findUnique({
      where: { slug: slugName },
    });

    if (slug) {
      return await this.generateSlugAndCheck(
        name,
        Math.floor(Math.random() * 100).toString(),
      );
    }

    return slugName;
  }

  private addIdInServices(services: CreateShopDto['services']) {
    return services.map((service) => {
      const id = crypto.randomBytes(16).toString('hex');
      return {
        ...service,
        id: `#${id}`,
      };
    });
  }

  async createShop(ownerId: string, data: CreateShopDto) {
    const slug = await this.generateSlugAndCheck(data.name);

    try {
      return await this.prisma.shop.create({
        data: {
          ownerId,
          name: data.name,
          services: this.addIdInServices(data.services),
          slug,
          workingHours: data.workingHours,
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.CONFLICT) {
          throw new ConflictException(
            `Shop with name ${data.name} already exists.`,
          );
        }
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new ConflictException(`Owner  ${ownerId} not found.`);
        }
      }
      throw error;
    }
  }
}
