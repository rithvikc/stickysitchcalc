'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calculator, Sparkles, DollarSign, TrendingUp, Package, Users, Award } from 'lucide-react';
import { pricingData, budgetRolls, rectangleOvalRolls, sheetedStickers, pricingConfig } from '@/data/pricing';
import { QuoteData } from '@/types/pricing';
import PricingGrid from './PricingGrid';

export default function PricingCalculator() {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [selectedMargin, setSelectedMargin] = useState('0.7');
  const [selectedProductType, setSelectedProductType] = useState<'auto' | 'circleSquare' | 'budget' | 'sheeted' | 'rectangleOval'>('auto');
  const [selectedShape, setSelectedShape] = useState<'circle' | 'rectangle'>('circle');
  const [currentQuoteData, setCurrentQuoteData] = useState<QuoteData | null>(null);

  // Get all available sizes across all product types
  const getAllSizes = () => {
    const allSizes = new Set([
      ...Object.keys(pricingData),
      ...Object.keys(budgetRolls),
      ...Object.keys(rectangleOvalRolls),
      ...Object.keys(sheetedStickers)
    ]);
    return Array.from(allSizes).sort();
  };

  const sizes = getAllSizes();

  // Smart product type selection based on shape, quantity, and user preference
  const determineProductType = (size: string, quantity: string, shape: 'circle' | 'rectangle', userChoice: string) => {
    if (userChoice !== 'auto') return userChoice;

    const quantityNum = parseInt(quantity.replace('x', ''));
    
    if (shape === 'rectangle') {
      return 'rectangleOval';
    }
    
    if (shape === 'circle') {
      if (quantityNum < 500) {
        // For low quantities, check if budget or sheeted is available
        if (budgetRolls[size]) return 'budget';
        if (sheetedStickers[size]) return 'sheeted';
      }
      return 'circleSquare';
    }
    
    return 'circleSquare';
  };

  // Get quantities based on product type and size
  const getQuantitiesForSize = (size: string, productType: string) => {
    let data;
    switch (productType) {
      case 'budget':
        data = budgetRolls[size];
        break;
      case 'rectangleOval':
        data = rectangleOvalRolls[size];
        break;
      case 'sheeted':
        data = sheetedStickers[size];
        break;
      case 'circleSquare':
      default:
        data = pricingData[size];
        break;
    }
    return data?.map(item => item.quantity) || [];
  };

  const calculatePricing = useCallback(() => {
    if (!selectedSize || !selectedQuantity) {
      setCurrentQuoteData(null);
      return;
    }

    const actualProductType = determineProductType(selectedSize, selectedQuantity, selectedShape, selectedProductType);
    let data;
    
    switch (actualProductType) {
      case 'budget':
        data = budgetRolls[selectedSize];
        break;
      case 'rectangleOval':
        data = rectangleOvalRolls[selectedSize];
        break;
      case 'sheeted':
        data = sheetedStickers[selectedSize];
        break;
      case 'circleSquare':
      default:
        data = pricingData[selectedSize];
        break;
    }

    const quantityData = data?.find(item => item.quantity === selectedQuantity);

    if (quantityData) {
      setCurrentQuoteData({
        size: selectedSize,
        quantity: selectedQuantity,
        data: quantityData
      });
    }
  }, [selectedSize, selectedQuantity, selectedShape, selectedProductType]);

  // Recalculate when any parameter changes
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

  const handleQuantitySliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = parseInt(e.target.value);
    const actualProductType = determineProductType(selectedSize, selectedQuantity, selectedShape, selectedProductType);
    const quantities = getQuantitiesForSize(selectedSize, actualProductType);
    if (quantities[sliderValue]) {
      setSelectedQuantity(quantities[sliderValue]);
    }
  };

  const getCurrentQuantitySliderValue = () => {
    if (!selectedSize || !selectedQuantity) return 0;
    const actualProductType = determineProductType(selectedSize, selectedQuantity, selectedShape, selectedProductType);
    const quantities = getQuantitiesForSize(selectedSize, actualProductType);
    return quantities.indexOf(selectedQuantity);
  };

  const getCurrentPrice = () => {
    if (!currentQuoteData) return 0;
    
    // Handle different product types
    if (currentQuoteData.data.productType === 'budget') {
      return currentQuoteData.data.recommendedSell || currentQuoteData.data.margins[selectedMargin] || 0;
    }
    
    if (currentQuoteData.data.productType === 'sheeted') {
      return currentQuoteData.data.finalSellPrice || 0;
    }
    
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
    
    if (currentQuoteData.data.productType === 'sheeted') {
      return currentQuoteData.data.profit || 0;
    }
    
    if (currentQuoteData.data.productType === 'budget') {
      const recommendedPrice = currentQuoteData.data.recommendedSell || 0;
      return recommendedPrice - currentQuoteData.data.costWithLam;
    }
    
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

  const getProductTypeDisplay = () => {
    if (!currentQuoteData) return 'Select options to see product type';
    
    switch (currentQuoteData.data.productType) {
      case 'budget':
        return 'Budget Roll (Low MOQ)';
      case 'sheeted':
        return 'Sheeted Stickers';
      case 'rectangleOval':
        return 'Rectangle/Oval Roll';
      case 'circleSquare':
      default:
        return 'Circle/Square Roll';
    }
  };

  const getCompetitorInfo = () => {
    if (!currentQuoteData) return null;
    
    if (currentQuoteData.data.productType === 'budget' && currentQuoteData.data.competitorOSP) {
      return {
        competitor: 'OSP',
        price: currentQuoteData.data.competitorOSP,
        ourAdvantage: currentQuoteData.data.competitorOSP - getCurrentPrice()
      };
    }
    
    if (currentQuoteData.data.productType === 'sheeted' && currentQuoteData.data.gigiPrice) {
      return {
        competitor: 'Gigi Print',
        price: currentQuoteData.data.gigiPrice,
        ourAdvantage: currentQuoteData.data.gigiPrice - getCurrentPrice()
      };
    }
    
    return null;
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
        <p className="text-xl opacity-90">Professional Sticker Pricing - Sales Team Quick Quote Tool</p>
        <p className="text-sm opacity-75 mt-2">Circle/Square • Rectangle/Oval • Budget Options • Sheeted Stickers</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quote Configuration</h2>
          
          <div className="space-y-6">
            {/* Shape Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sticker Shape
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedShape('circle')}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedShape === 'circle'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Circle/Square
                </button>
                <button
                  onClick={() => setSelectedShape('rectangle')}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedShape === 'rectangle'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rectangle/Oval
                </button>
              </div>
            </div>

            {/* Product Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Type
              </label>
              <select
                value={selectedProductType}
                onChange={(e) => setSelectedProductType(e.target.value as any)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
              >
                <option value="auto">Auto-Select (Recommended)</option>
                <option value="circleSquare">Circle/Square Rolls (500+ qty)</option>
                <option value="budget">Budget Rolls (100-400 qty)</option>
                <option value="sheeted">Sheeted Stickers (30-1000 qty)</option>
                <option value="rectangleOval">Rectangle/Oval Rolls</option>
              </select>
            </div>

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

            {/* Quantity Selection with Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Quantity
              </label>
              
              {/* Quantity Dropdown */}
              <select
                value={selectedQuantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                disabled={!selectedSize}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed mb-4"
              >
                <option value="">Choose quantity...</option>
                {selectedSize && getQuantitiesForSize(selectedSize, determineProductType(selectedSize, selectedQuantity, selectedShape, selectedProductType)).map(quantity => (
                  <option key={quantity} value={quantity}>
                    {quantity.replace('x', '')} pieces
                  </option>
                ))}
              </select>

              {/* Quantity Slider */}
              {selectedSize && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>Quick Quantity Adjust</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={getQuantitiesForSize(selectedSize, determineProductType(selectedSize, selectedQuantity, selectedShape, selectedProductType)).length - 1}
                    step="1"
                    value={getCurrentQuantitySliderValue()}
                    onChange={handleQuantitySliderChange}
                    className="w-full h-3 bg-gradient-to-r from-orange-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    {getQuantitiesForSize(selectedSize, determineProductType(selectedSize, selectedQuantity, selectedShape, selectedProductType)).map((qty, index) => (
                      <span key={index} className="text-center">
                        {qty.replace('x', '')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Margin Slider - Only show for non-budget, non-sheeted products */}
            {currentQuoteData && !['budget', 'sheeted'].includes(currentQuoteData.data.productType) && (
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
            )}

            {/* Quick Margin Buttons - Only show for standard products */}
            {currentQuoteData && !['budget', 'sheeted'].includes(currentQuoteData.data.productType) && (
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
            )}
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
            <div className="text-gray-600 mb-2">
              {getProductTypeDisplay()}
            </div>
            {currentQuoteData && !['budget', 'sheeted'].includes(currentQuoteData.data.productType) && (
              <div className="text-sm text-gray-500">
                {getMarginPercent()}% Margin ({selectedMargin}x)
              </div>
            )}
            
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

            {/* Competitive Pricing Info */}
            {getCompetitorInfo() && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">Competitive Advantage</span>
                </div>
                <div className="text-sm text-green-700">
                  {getCompetitorInfo()!.competitor}: ${getCompetitorInfo()!.price} 
                  <span className="font-semibold text-green-800 ml-2">
                    We save ${getCompetitorInfo()!.ourAdvantage.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quote Details */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Quote Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Product Type:</span>
                <span className="font-semibold">{getProductTypeDisplay()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Shape:</span>
                <span className="font-semibold">{selectedShape === 'circle' ? 'Circle/Square' : 'Rectangle/Oval'}</span>
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
              {currentQuoteData && !['budget', 'sheeted'].includes(currentQuoteData.data.productType) && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Margin:</span>
                  <span className="font-semibold">{`${getMarginPercent()}% (${selectedMargin}x)`}</span>
                </div>
              )}
              <div className="flex justify-between py-3 text-lg font-bold text-gray-800">
                <span>Final Price:</span>
                <span className="text-blue-600">${getCurrentPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Grid - Full Width - Only show for standard products */}
      {currentQuoteData && !['budget', 'sheeted'].includes(currentQuoteData.data.productType) && (
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