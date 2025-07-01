import { z } from 'zod';

// Common enums and types
export const OrganizationStatus = z.enum(['active', 'suspended', 'deleted']);
export type OrganizationStatus = z.infer<typeof OrganizationStatus>;

export const PaymentStatus = z.enum(['pending', 'paid', 'refunded', 'failed']);
export type PaymentStatus = z.infer<typeof PaymentStatus>;

export const CurrencySchema = z.number().int().nonnegative();

// Base schemas for common fields
export const BaseEntitySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const OrganizationScopedSchema = BaseEntitySchema.extend({
  organizationId: z.string(), // Clerk organization ID
});