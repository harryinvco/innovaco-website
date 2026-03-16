import { NextResponse } from 'next/server'
import { bookingSchema } from '@/lib/validations'
import { sendEmail } from '@/lib/resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = bookingSchema.parse(body)

    const contactEmail = process.env.CONTACT_EMAIL || 'hello@hninnovaco.com'

    // Send confirmation to prospect
    await sendEmail({
      to: data.email,
      subject: 'We received your discovery call request — HN Innovaco',
      html: `
        <h2>Thanks for booking a discovery call, ${data.firstName}.</h2>
        <p>We've received your request and will review your answers before we get in touch.</p>
        <p>You can expect to hear from us within <strong>one business day</strong>.</p>
        <p>In the meantime, feel free to reply to this email if you have anything to add.</p>
        <br>
        <p>Best,<br>Harry Newton<br>HN Innovaco</p>
      `,
    })

    // Send notification to Harry
    await sendEmail({
      to: contactEmail,
      subject: `New discovery call — ${data.businessType} — ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New discovery call request</h2>
        <hr>
        <h3>Contact</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Company:</strong> ${data.companyName}</p>
        <hr>
        <h3>Business</h3>
        <p><strong>Type:</strong> ${data.businessType}</p>
        <p><strong>Size:</strong> ${data.companySize}</p>
        <p><strong>Challenge:</strong> ${data.challenge}</p>
        <hr>
        <h3>Project</h3>
        <p><strong>Timeline:</strong> ${data.timeline}</p>
        ${data.source ? `<p><strong>Source:</strong> ${data.source}</p>` : ''}
        ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ''}
      `,
    })

    // Fire n8n webhook (fire-and-forget)
    const webhookUrl = process.env.N8N_BOOKING_WEBHOOK_URL
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(() => {})
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to process booking' }, { status: 500 })
  }
}
