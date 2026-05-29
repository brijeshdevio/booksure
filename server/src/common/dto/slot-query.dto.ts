import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const SlotsQuerySchema = z
  .object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD')
      .optional(),
  })
  .strict();

export class SlotQueryDto extends createZodDto(SlotsQuerySchema) {}
