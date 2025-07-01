'use client';

import { useState } from 'react';
import { User, StudioSchema, CreateStudioInput } from '@repo/types';
import { formatCurrency, capitalize } from '@repo/utils';

export default function DemoPage() {
  const [result, setResult] = useState<string>('');

  const demonstrateSharedPackages = () => {
    // Using shared types
    const user: User = {
      id: 'user_123',
      email: 'demo@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      organizationId: 'org_456',
      roles: ['admin', 'instructor'],
    };

    // Using Zod schema for validation
    try {
      const studioInput: CreateStudioInput = {
        name: 'Art Studio',
        stripeConnectId: 'acct_456',
        settings: {
          businessIdentifierType: 'ein',
          businessIdentifier: '12-3456789',
          widgetPrimaryColor: '#FF5733',
          widgetSecondaryColor: '#FFFFFF',
          taxRate: 0.0875,
          taxName: 'Sales Tax',
          payoutSchedule: 'weekly',
        },
      };

      const validatedInput = CreateStudioInput.parse(studioInput);

      // Using shared utils
      const price = formatCurrency(15000); // $150.00
      const title = capitalize('welcome to squirrel');

      setResult(JSON.stringify({
        message: 'Shared packages work!',
        user,
        validatedInput,
        formattedPrice: price,
        capitalizedText: title,
      }, null, 2));
    } catch (error) {
      setResult(`Validation error: ${error}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Shared Packages Demo</h1>
      
      <button
        onClick={demonstrateSharedPackages}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Test Shared Packages
      </button>

      {result && (
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {result}
        </pre>
      )}
    </div>
  );
}