import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const LoginSchema = z
  .object({
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(64, 'Password must be at most 64 characters long'),
  })
  .strict();

export class LoginDto extends createZodDto(LoginSchema) {}
