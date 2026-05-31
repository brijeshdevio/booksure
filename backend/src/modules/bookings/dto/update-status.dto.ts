import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateStatusSchema = z
  .object({
    status: z.enum(['DONE', 'CANCELLED']).default('DONE'),
  })
  .strict();

export class UpdateStatusDto extends createZodDto(UpdateStatusSchema) {}
