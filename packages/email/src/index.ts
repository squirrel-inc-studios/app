/**
 * Placeholder email service
 */

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  console.log('Email would be sent:', options);
  // TODO: Implement Resend integration
}

export function getBookingConfirmationTemplate(data: any): string {
  return `<h1>Booking Confirmation</h1><p>Details: ${JSON.stringify(data)}</p>`;
}