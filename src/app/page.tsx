'use client';

import PricingCalculator from '@/components/PricingCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800">
      <div className="container mx-auto px-4 py-8">
        <PricingCalculator />
      </div>
    </main>
  );
}
