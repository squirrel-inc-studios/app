import { z } from 'zod';

// Clerk-based auth types
export const UserRole = z.enum(['admin', 'instructor', 'staff', 'viewer']);
export type UserRole = z.infer<typeof UserRole>;

export const UserSchema = z.object({
  id: z.string(), // Clerk user ID
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  organizationId: z.string().optional(), // Current organization context
  roles: z.array(UserRole).default([]),
});

export type User = z.infer<typeof UserSchema>;