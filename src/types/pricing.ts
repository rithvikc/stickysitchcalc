export interface PricingItem {
  quantity: string;
  costWithLam?: number;
  margins?: {
    [key: string]: number;
  };
  stickySitchPrice?: number;
  profit?: number;
  productType: 'circleSquare' | 'rectangleOval' | 'budget' | 'sheeted';
  // Optional fields for budget rolls
  competitorOSP?: number;
  recommendedSell?: number;
  // Optional fields for sheeted stickers
  sheetsNeeded?: number;
  materialCost?: number;
  inkCost?: number;
  totalCost?: number;
  gigiPrice?: number;
  shippingPackaging?: number;
  ourSellPrice?: number;
  finalSellPrice?: number;
}

export interface PricingData {
  [size: string]: PricingItem[];
}

export interface BudgetRolls {
  [size: string]: PricingItem[];
}

export interface RectangleOvalRolls {
  [size: string]: PricingItem[];
}

export interface SheetedStickers {
  [size: string]: PricingItem[];
}

export interface QuoteData {
  size: string;
  quantity: string;
  data: PricingItem;
}

export interface PricingConfig {
  currency: string;
  taxExcluded: boolean;
  baseMaterial: string;
  markupTiers: {
    standard: number[];
    budget: number[];
  };
  rounding: string;
  lastUpdated: string;
  source: string;
}

export interface ProductTypeRules {
  minimumOrderQuantity: number;
  availableSizes: string[];
  quantityTiers: number[];
  pricingRules: {
    markupCalculation: string;
    quantityTierLogic: string;
    markupAvailability?: string;
    notes?: string;
  };
} 