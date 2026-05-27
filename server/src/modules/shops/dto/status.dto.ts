import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const StatusSchema = z
  .object({
    isActive: z.boolean().default(true),
  })

  .strict();

export class StatusDto extends createZodDto(StatusSchema) {}
