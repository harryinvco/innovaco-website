import { z } from 'zod'

export const bookingSchema = z.object({
  services: z.array(z.string()).min(1, 'Select at least one service'),
  preferredDate: z.string().min(1, 'Select a date'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening']),
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().min(8, 'Valid phone number required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().optional(),
  notes: z.string().optional(),
})

export type BookingFormData = z.infer<typeof bookingSchema>

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(8, 'Valid phone number required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  message: z.string().min(10, 'Message too short'),
})

export type ContactFormData = z.infer<typeof contactSchema>
