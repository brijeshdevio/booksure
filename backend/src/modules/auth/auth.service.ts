import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { hash, verify } from 'argon2';

import { DUMMY_HASH, PRISMA_CODES } from '../../common/constants';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}

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

  async login(data: LoginDto) {
    const user = await this.prisma.owner.findUnique({
      where: { email: data.email },
    });

    const passwordHash = user?.password ?? DUMMY_HASH;
    const isPasswordValid = await verify(passwordHash, data.password);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
    });

    return { accessToken };
  }

  async getOwner(id: string) {
    const user = await this.prisma.owner.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException(
        'You are not logged in or your session has expired. Please log in again.',
      );
    }

    return user;
  }
}
