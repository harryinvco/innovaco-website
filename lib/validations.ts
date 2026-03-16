import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
  source: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const bookingSchema = z.object({
  businessType: z.string().min(1),
  challenge: z.string().min(1),
  companySize: z.string().min(1),
  timeline: z.string().min(1),
  source: z.string().optional(),
  notes: z.string().optional(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  companyName: z.string().min(1),
})

export type BookingFormData = z.infer<typeof bookingSchema>
