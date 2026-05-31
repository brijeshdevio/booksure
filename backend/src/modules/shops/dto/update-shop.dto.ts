import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const ServiceSchema = z
  .object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(500).optional(),
    duration: z.number().int().positive().max(480).min(15),
  })
  .strict();

const WorkingHoursSchema = z
  .object({
    start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    slotDuration: z.number().int().positive().max(240).min(15),
    days: z.array(z.number().int().min(0).max(6)).nonempty().max(7),
  })
  .strict();

export const UpdateShopSchema = z
  .object({
    name: z.string().min(1).max(150).optional(),
    address: z.string().min(5).max(300).optional(),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/)
      .optional(),
    services: z.array(ServiceSchema).max(12).min(1).optional(),
    workingHours: WorkingHoursSchema.optional(),
  })
  .strict();

export class UpdateShopDto extends createZodDto(UpdateShopSchema) {}
