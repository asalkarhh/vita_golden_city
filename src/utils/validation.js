import { z } from 'zod'

export const collabFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
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
  city: z.string().min(1, 'City is required'),
  businessType: z.string().min(1, 'Please select a business type'),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  brief: z
    .string()
    .min(30, 'Please write at least 30 characters')
    .max(500, 'Maximum 500 characters allowed'),
  contactMethod: z.enum(['whatsapp', 'call', 'email']).default('whatsapp'),
  botcheck: z.string().max(0).default(''),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  botcheck: z.string().max(0).default(''),
})
