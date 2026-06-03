import { z } from 'zod'

export const collabFormSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  whatsappSame: z.boolean().default(true),
  email: z
    .string()
    .email('Enter a valid email')
    .optional()
    .or(z.literal('')),
  city: z.string().optional(),
  businessType: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  brief: z
    .string()
    .max(500, 'Maximum 500 characters allowed')
    .optional(),
  botcheck: z.string().max(0).default(''),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  botcheck: z.string().max(0).default(''),
})
