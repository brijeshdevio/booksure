import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { hash } from 'argon2';
import { PRISMA_CODES } from 'src/common/constants';
import { PrismaService } from 'src/prisma/prisma.service';

import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: RegisterDto) {
    try {
      const hashedPassword = await hash(data.password);
      return await this.prisma.owner.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.CONFLICT
      ) {
        throw new ConflictException(
          `Owner with email ${data.email} already exists.`,
        );
      }
      throw error;
    }
  }
}
