/**
 * Currency utility functions
 */

/**
 * Converts cents to dollars
 */
export function centsToDollars(cents: number): number {
  return cents / 100;
}

/**
 * Converts dollars to cents
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Formats cents as a currency string
 */
export function formatCurrency(cents: number, locale = 'en-US', currency = 'USD'): string {
  const dollars = centsToDollars(cents);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(dollars);
}

/**
 * Calculates tax amount in cents
 */
export function calculateTax(amountCents: number, taxRate: number): number {
  return Math.round(amountCents * taxRate);
}

/**
 * Calculates total including tax
 */
export function calculateTotalWithTax(amountCents: number, taxRate: number): number {
  return amountCents + calculateTax(amountCents, taxRate);
}