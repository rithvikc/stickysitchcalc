'use client';

import { PricingItem } from '@/types/pricing';

interface PricingGridProps {
  pricingItem: PricingItem;
  selectedMargin: string;
  onMarginSelect: (margin: string) => void;
  quantity: string;
}

export default function PricingGrid({ pricingItem, selectedMargin, onMarginSelect, quantity }: PricingGridProps) {
  const margins = ['0.5', '0.6', '0.7', '0.8', '0.9', '1.0'];
  
  const getMarginLabel = (margin: string) => {
    return `${Math.round(parseFloat(margin) * 100)}%`;
  };

  const getUnitPrice = (totalPrice: number) => {
    const quantityNumber = parseInt(quantity.replace('x', ''));
    return totalPrice / quantityNumber;
  };

  const getProfit = (totalPrice: number) => {
    return totalPrice - (pricingItem.costWithLam || 0);
  };

  // Don't render if no margins data (for sheeted stickers, budget rolls, etc.)
  if (!pricingItem.margins) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">All Pricing Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {margins.map(margin => {
          const price = pricingItem.margins?.[margin];
          if (!price) return null;
          
          return (
            <button
              key={margin}
              onClick={() => onMarginSelect(margin)}
              className={`p-5 rounded-xl border-2 transition-all duration-200 text-center hover:scale-105 ${
                selectedMargin === margin
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="text-sm text-gray-600 mb-2">
                {getMarginLabel(margin)} Margin
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                ${price.toFixed(2)}
              </div>
              <div className="text-sm text-green-600 font-semibold mb-1">
                ${getUnitPrice(price).toFixed(3)} per sticker
              </div>
              <div className="text-sm text-blue-600 font-semibold">
                +${getProfit(price).toFixed(2)} profit
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
} 