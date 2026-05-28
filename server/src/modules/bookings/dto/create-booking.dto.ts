import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateBookingSchema = z
  .object({
    shopSlug: z.string().min(3).max(100),
    customerName: z.string().min(2).max(100),
    scheduledAt: z.string().datetime('YYYY-MM-dd HH:MM:SS'),
  })
  .strict();

export class CreateBookingDto extends createZodDto(CreateBookingSchema) {}
