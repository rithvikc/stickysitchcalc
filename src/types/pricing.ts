export interface PricingItem {
  quantity: string;
  costWithLam: number;
  margins: {
    [key: string]: number;
  };
  stickySitchPrice: number;
  profit: number;
}

export interface PricingData {
  [size: string]: PricingItem[];
}

export interface QuoteData {
  size: string;
  quantity: string;
  data: PricingItem;
} 