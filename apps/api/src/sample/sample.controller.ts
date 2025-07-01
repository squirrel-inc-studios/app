import { Controller, Get } from '@nestjs/common';
import { User, StudioSchema } from '@repo/types';
import { formatCurrency, formatDate } from '@repo/utils';
import { sendEmail } from '@repo/email';

@Controller('sample')
export class SampleController {
  @Get()
  async demonstrateSharedPackages() {
    // Using shared types
    const user: User = {
      id: 'user_123',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      organizationId: 'org_123',
      roles: ['admin'],
    };

    // Using Zod schema for validation
    const studioData = {
      id: 'org_123',
      name: 'Yoga Studio',
      status: 'active',
      stripeConnectId: 'acct_123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const validatedStudio = StudioSchema.parse(studioData);

    // Using shared utils
    const formattedPrice = formatCurrency(9900); // $99.00
    const formattedDate = formatDate(new Date());

    // Using shared email (placeholder)
    await sendEmail({
      to: user.email,
      subject: 'Welcome to Squirrel',
      html: '<h1>Welcome!</h1>',
    });

    return {
      message: 'Shared packages demonstration',
      user,
      studio: validatedStudio,
      formattedPrice,
      formattedDate,
    };
  }
}