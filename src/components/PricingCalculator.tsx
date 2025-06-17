'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calculator, Sparkles, DollarSign, TrendingUp } from 'lucide-react';
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

  const getPricePerSticker = () => {
    if (!currentQuoteData) return 0;
    const totalPrice = getCurrentPrice();
    const quantity = parseInt(selectedQuantity.replace('x', ''));
    return totalPrice / quantity;
  };

  const getProfit = () => {
    if (!currentQuoteData) return 0;
    return getCurrentPrice() - currentQuoteData.data.costWithLam;
  };

  const getProfitPerSticker = () => {
    if (!currentQuoteData) return 0;
    const profit = getProfit();
    const quantity = parseInt(selectedQuantity.replace('x', ''));
    return profit / quantity;
  };

  const handleMarginSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMargin(e.target.value);
  };

  const getMarginLabel = (margin: string) => {
    const percent = Math.round(parseFloat(margin) * 100);
    if (percent <= 60) return 'Standard';
    if (percent <= 70) return 'Recommended';
    if (percent <= 80) return 'Premium';
    if (percent <= 90) return 'High';
    return 'Maximum';
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
        <p className="text-xl opacity-90">Circle or Square BOPP w/ LAM - Sales Team Quick Quote Tool</p>
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

            {/* Margin Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profit Margin: {getMarginPercent()}% ({getMarginLabel(selectedMargin)})
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0.5"
                  max="1.0"
                  step="0.1"
                  value={selectedMargin}
                  onChange={handleMarginSliderChange}
                  className="w-full h-3 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>50% (Min)</span>
                  <span>60%</span>
                  <span>70% (Rec)</span>
                  <span>80%</span>
                  <span>90%</span>
                  <span>100% (Max)</span>
                </div>
              </div>
            </div>

            {/* Quick Margin Buttons */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quick Select
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['0.6', '0.7', '0.8'].map(margin => (
                  <button
                    key={margin}
                    onClick={() => setSelectedMargin(margin)}
                    className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedMargin === margin
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {Math.round(parseFloat(margin) * 100)}%
                  </button>
                ))}
              </div>
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
            <div className="text-gray-600 mb-4">
              {currentQuoteData ? `${getMarginPercent()}% Margin (${selectedMargin}x)` : 'Select options to see pricing'}
            </div>
            {currentQuoteData && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Profit</span>
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    ${getProfit().toFixed(2)}
                  </div>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Per Unit</span>
                  </div>
                  <div className="text-xl font-bold text-purple-600">
                    ${getProfitPerSticker().toFixed(3)}
                  </div>
                </div>
              </div>
            )}
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
                <span className="text-gray-600">Price per Sticker:</span>
                <span className="font-semibold">
                  {currentQuoteData ? `$${getPricePerSticker().toFixed(3)}` : '-'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Profit per Sticker:</span>
                <span className="font-semibold text-green-600">
                  {currentQuoteData ? `$${getProfitPerSticker().toFixed(3)}` : '-'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Total Profit:</span>
                <span className="font-semibold text-green-600">
                  {currentQuoteData ? `$${getProfit().toFixed(2)}` : '-'}
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
            quantity={selectedQuantity}
          />
        </div>
      )}
    </div>
  );
} 