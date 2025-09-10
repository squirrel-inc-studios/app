import { z } from 'zod';
import { OrganizationStatus, CurrencySchema } from './common';

// Studio (Organization) schemas
export const StudioSchema = z.object({
  id: z.string(), // Clerk organization ID
  name: z.string(),
  status: OrganizationStatus,
  stripeConnectId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Studio = z.infer<typeof StudioSchema>;

export const BusinessIdentifierType = z.enum(['abn', 'ein', 'business_number', 'other']);
export type BusinessIdentifierType = z.infer<typeof BusinessIdentifierType>;

export const PayoutSchedule = z.enum(['daily', 'weekly', 'monthly']);
export type PayoutSchedule = z.infer<typeof PayoutSchedule>;

export const StudioSettingsSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string(),
  businessIdentifierType: BusinessIdentifierType,
  businessIdentifier: z.string(),
  widgetPrimaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  widgetSecondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  taxRate: z.number().min(0).max(1), // e.g., 0.0825 for 8.25%
  taxName: z.string(), // e.g., "Sales Tax", "HST"
  payoutSchedule: PayoutSchedule,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type StudioSettings = z.infer<typeof StudioSettingsSchema>;
