import crypto from 'node:crypto';

import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import slugify from 'slugify';

import { PRISMA_CODES } from '../../common/constants';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { StatusDto } from './dto/status.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

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
          throw new BadRequestException(`Owner  ${ownerId} not found.`);
        }
      }
      throw error;
    }
  }

  async getShop(ownerId: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { ownerId },
      omit: {
        ownerId: true,
      },
    });
    if (!shop) {
      throw new BadRequestException(
        `Could not find shop for owner ${ownerId} or shop does not exist.`,
      );
    }

    return shop;
  }

  async updateShop(ownerId: string, data: UpdateShopDto) {
    try {
      const slug = data.name
        ? await this.generateSlugAndCheck(data.name)
        : undefined;

      return await this.prisma.shop.update({
        where: { ownerId },
        data: { ...data, slug },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new BadRequestException(
            `Could not find shop for owner ${ownerId} or shop does not exist.`,
          );
        }
      }
      throw error;
    }
  }

  async updateStatus(ownerId: string, data: StatusDto) {
    try {
      return await this.prisma.shop.update({
        where: { ownerId },
        data: { isActive: data.isActive },
        select: {
          id: true,
          name: true,
          slug: true,
          isActive: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new BadRequestException(
            `Could not find shop for owner ${ownerId} or shop does not exist.`,
          );
        }
      }
      throw error;
    }
  }
}
