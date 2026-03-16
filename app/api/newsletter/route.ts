import { NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail } from '@/lib/resend'

const newsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = newsletterSchema.parse(body)

    const contactEmail = process.env.CONTACT_EMAIL || 'hello@hninnovaco.com'

    await sendEmail({
      to: contactEmail,
      subject: `New newsletter signup: ${data.email}`,
      html: `
        <h2>New newsletter signup</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.name ? `<p><strong>Name:</strong> ${data.name}</p>` : ''}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
