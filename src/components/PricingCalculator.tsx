'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calculator, Sparkles } from 'lucide-react';
import { pricingData } from '@/data/pricing';
import { QuoteData } from '@/types/pricing';
import PricingGrid from './PricingGrid';

export default function PricingCalculator() {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedMargin, setSelectedMargin] = useState('0.7');
  const [currentQuoteData, setCurrentQuoteData] = useState<QuoteData | null>(null);

  const sizes = Object.keys(pricingData);

  const getQuantitiesForSize = (size: string) => {
    return pricingData[size]?.map(item => item.quantity) || [];
  };

  const calculatePricing = useCallback(() => {
    if (!selectedSize || !selectedQuantity) {
      setCurrentQuoteData(null);
      return;
    }

    const sizeData = pricingData[selectedSize];
    const quantityData = sizeData?.find(item => item.quantity === selectedQuantity);

    if (quantityData) {
      setCurrentQuoteData({
        size: selectedSize,
        quantity: selectedQuantity,
        data: quantityData
      });
    }
  }, [selectedSize, selectedQuantity]);

  // Recalculate when size or quantity changes
  useEffect(() => {
    calculatePricing();
  }, [calculatePricing]);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setSelectedQuantity('');
  };

  const handleQuantityChange = (quantity: string) => {
    setSelectedQuantity(quantity);
  };

  const getCurrentPrice = () => {
    if (!currentQuoteData) return 0;
    return currentQuoteData.data.margins[selectedMargin] || 0;
  };

  const getMarginPercent = () => {
    return Math.round(parseFloat(selectedMargin) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 text-center text-white">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator className="w-8 h-8" />
          <h1 className="text-4xl font-bold">Sticky Sitch Pricing Calculator</h1>
          <Sparkles className="w-8 h-8" />
        </div>
        <p className="text-xl opacity-90">Circle or Square BOPP w/ LAM - Quick Quote Generator</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quote Configuration</h2>
          
          <div className="space-y-6">
            {/* Size Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => handleSizeChange(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
              >
                <option value="">Choose a size...</option>
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Quantity Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Quantity
              </label>
              <select
                value={selectedQuantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                disabled={!selectedSize}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Choose quantity...</option>
                {getQuantitiesForSize(selectedSize).map(quantity => (
                  <option key={quantity} value={quantity}>
                    {quantity.replace('x', '')} pieces
                  </option>
                ))}
              </select>
            </div>

            {/* Margin Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Profit Margin
              </label>
              <select
                value={selectedMargin}
                onChange={(e) => setSelectedMargin(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
              >
                <option value="0.5">50% (0.5x) - Minimum</option>
                <option value="0.6">60% (0.6x) - Standard</option>
                <option value="0.7">70% (0.7x) - Recommended</option>
                <option value="0.8">80% (0.8x) - Premium</option>
                <option value="0.9">90% (0.9x) - High</option>
                <option value="1.0">100% (1.0x) - Maximum</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Quote Price */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Quote Price</h3>
            <div className="text-5xl font-bold text-blue-600 mb-2">
              ${getCurrentPrice().toFixed(2)}
            </div>
            <div className="text-gray-600">
              {currentQuoteData ? `${getMarginPercent()}% Margin (${selectedMargin}x)` : 'Select options to see pricing'}
            </div>
          </div>

          {/* Quote Details */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Quote Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Product:</span>
                <span className="font-semibold">Circle or Square BOPP w/ LAM</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Size:</span>
                <span className="font-semibold">{selectedSize || '-'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold">
                  {selectedQuantity ? `${selectedQuantity.replace('x', '')} pieces` : '-'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Base Cost:</span>
                <span className="font-semibold">
                  {currentQuoteData ? `$${currentQuoteData.data.costWithLam.toFixed(2)}` : '-'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Margin:</span>
                <span className="font-semibold">{`${getMarginPercent()}% (${selectedMargin}x)`}</span>
              </div>
              <div className="flex justify-between py-3 text-lg font-bold text-gray-800">
                <span>Final Price:</span>
                <span className="text-blue-600">${getCurrentPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Grid - Full Width */}
      {currentQuoteData && (
        <div className="mt-8">
          <PricingGrid 
            pricingItem={currentQuoteData.data}
            selectedMargin={selectedMargin}
            onMarginSelect={setSelectedMargin}
          />
        </div>
      )}
    </div>
  );
} 