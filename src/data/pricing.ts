import { PricingData, BudgetRolls, RectangleOvalRolls, SheetedStickers } from '@/types/pricing';

export const pricingConfig = {
  "currency": "AUD",
  "taxExcluded": true,
  "baseMaterial": "Synthetic with Laminate",
  "markupTiers": {
    "standard": [0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    "budget": [0.5, 0.8]
  },
  "rounding": "toNearestDollar",
  "lastUpdated": "2025-06-17",
  "source": "New Sticky Sitch Pricing Updated 1.xlsx"
};

export const pricingData: PricingData = {
  // Circle/Square Individual Rolls (500+ minimum)
  "30 x 30 mm": [
    {"quantity": "x500", "costWithLam": 120, "margins": {"0.6": 192, "0.7": 204, "0.8": 216, "0.9": 228, "1.0": 240}, "stickySitchPrice": 160, "profit": 40, "productType": "circleSquare"},
    {"quantity": "x1000", "costWithLam": 120, "margins": {"0.5": 180, "0.6": 192, "0.7": 204, "0.8": 216, "0.9": 228, "1.0": 240}, "stickySitchPrice": 204, "profit": 84, "productType": "circleSquare"},
    {"quantity": "x2000", "costWithLam": 120, "margins": {"0.5": 180, "0.6": 192, "0.7": 204, "0.8": 216, "0.9": 228, "1.0": 240}, "stickySitchPrice": 240, "profit": 120, "productType": "circleSquare"},
    {"quantity": "x3000", "costWithLam": 120, "margins": {"0.5": 180, "0.6": 192, "0.7": 204, "0.8": 216, "0.9": 228, "1.0": 240}, "stickySitchPrice": 259, "profit": 139, "productType": "circleSquare"},
    {"quantity": "x4000", "costWithLam": 131, "margins": {"0.5": 197, "0.6": 210, "0.7": 223, "0.8": 236, "0.9": 249, "1.0": 262}, "stickySitchPrice": 262, "profit": 131, "productType": "circleSquare"},
    {"quantity": "x5000", "costWithLam": 151, "margins": {"0.5": 227, "0.6": 242, "0.7": 257, "0.8": 272, "0.9": 287, "1.0": 302}, "stickySitchPrice": 302, "profit": 151, "productType": "circleSquare"},
    {"quantity": "x10000", "costWithLam": 216, "margins": {"0.5": 324, "0.6": 346, "0.7": 367, "0.8": 389, "0.9": 410, "1.0": 432}, "stickySitchPrice": 410.4, "profit": 194.4, "productType": "circleSquare"}
  ],
  "35 x 35 mm": [
    {"quantity": "x500", "costWithLam": 130, "margins": {"0.6": 208, "0.7": 221, "0.8": 234, "0.9": 247, "1.0": 260}, "stickySitchPrice": 173, "profit": 43, "productType": "circleSquare"},
    {"quantity": "x1000", "costWithLam": 130, "margins": {"0.5": 195, "0.6": 208, "0.7": 221, "0.8": 234, "0.9": 247, "1.0": 260}, "stickySitchPrice": 221, "profit": 91, "productType": "circleSquare"},
    {"quantity": "x2000", "costWithLam": 130, "margins": {"0.5": 195, "0.6": 208, "0.7": 221, "0.8": 234, "0.9": 247, "1.0": 260}, "stickySitchPrice": 260, "profit": 130, "productType": "circleSquare"},
    {"quantity": "x5000", "costWithLam": 165, "margins": {"0.5": 248, "0.6": 264, "0.7": 281, "0.8": 297, "0.9": 314, "1.0": 330}, "stickySitchPrice": 330, "profit": 165, "productType": "circleSquare"},
    {"quantity": "x10000", "costWithLam": 236, "margins": {"0.5": 354, "0.6": 378, "0.7": 401, "0.8": 425, "0.9": 448, "1.0": 472}, "stickySitchPrice": 448.4, "profit": 212.4, "productType": "circleSquare"}
  ],
  "50 x 50 mm": [
    {"quantity": "x500", "costWithLam": 140, "margins": {"0.6": 224, "0.7": 238, "0.8": 252, "0.9": 266, "1.0": 280}, "stickySitchPrice": 187, "profit": 47, "productType": "circleSquare"},
    {"quantity": "x1000", "costWithLam": 140, "margins": {"0.5": 210, "0.6": 224, "0.7": 238, "0.8": 252, "0.9": 266, "1.0": 280}, "stickySitchPrice": 238, "profit": 98, "productType": "circleSquare"},
    {"quantity": "x2000", "costWithLam": 140, "margins": {"0.5": 210, "0.6": 224, "0.7": 238, "0.8": 252, "0.9": 266, "1.0": 280}, "stickySitchPrice": 280, "profit": 140, "productType": "circleSquare"},
    {"quantity": "x5000", "costWithLam": 178, "margins": {"0.5": 267, "0.6": 285, "0.7": 303, "0.8": 320, "0.9": 338, "1.0": 356}, "stickySitchPrice": 356, "profit": 178, "productType": "circleSquare"},
    {"quantity": "x10000", "costWithLam": 254, "margins": {"0.5": 381, "0.6": 406, "0.7": 432, "0.8": 457, "0.9": 483, "1.0": 508}, "stickySitchPrice": 482.6, "profit": 228.6, "productType": "circleSquare"}
  ],
  "60 x 60 mm": [
    {"quantity": "x500", "costWithLam": 155, "margins": {"0.6": 248, "0.7": 264, "0.8": 279, "0.9": 295, "1.0": 310}, "stickySitchPrice": 207, "profit": 52, "productType": "circleSquare"},
    {"quantity": "x1000", "costWithLam": 155, "margins": {"0.5": 233, "0.6": 248, "0.7": 264, "0.8": 279, "0.9": 295, "1.0": 310}, "stickySitchPrice": 263.5, "profit": 108.5, "productType": "circleSquare"},
    {"quantity": "x2000", "costWithLam": 155, "margins": {"0.5": 233, "0.6": 248, "0.7": 264, "0.8": 279, "0.9": 295, "1.0": 310}, "stickySitchPrice": 310, "profit": 155, "productType": "circleSquare"},
    {"quantity": "x5000", "costWithLam": 197, "margins": {"0.5": 296, "0.6": 315, "0.7": 335, "0.8": 355, "0.9": 374, "1.0": 394}, "stickySitchPrice": 394, "profit": 197, "productType": "circleSquare"},
    {"quantity": "x10000", "costWithLam": 282, "margins": {"0.5": 423, "0.6": 451, "0.7": 479, "0.8": 508, "0.9": 536, "1.0": 564}, "stickySitchPrice": 535.8, "profit": 253.8, "productType": "circleSquare"}
  ],
  "80 x 80 mm": [
    {"quantity": "x500", "costWithLam": 207, "margins": {"0.6": 331, "0.7": 352, "0.8": 373, "0.9": 393, "1.0": 414}, "stickySitchPrice": 276, "profit": 69, "productType": "circleSquare"},
    {"quantity": "x1000", "costWithLam": 207, "margins": {"0.5": 311, "0.6": 331, "0.7": 352, "0.8": 373, "0.9": 393, "1.0": 414}, "stickySitchPrice": 351.9, "profit": 144.9, "productType": "circleSquare"},
    {"quantity": "x2000", "costWithLam": 207, "margins": {"0.5": 311, "0.6": 331, "0.7": 352, "0.8": 373, "0.9": 393, "1.0": 414}, "stickySitchPrice": 414, "profit": 207, "productType": "circleSquare"},
    {"quantity": "x5000", "costWithLam": 263, "margins": {"0.5": 395, "0.6": 421, "0.7": 447, "0.8": 473, "0.9": 500, "1.0": 526}, "stickySitchPrice": 526, "profit": 263, "productType": "circleSquare"},
    {"quantity": "x10000", "costWithLam": 378, "margins": {"0.5": 567, "0.6": 605, "0.7": 643, "0.8": 680, "0.9": 718, "1.0": 756}, "stickySitchPrice": 718.2, "profit": 340.2, "productType": "circleSquare"}
  ],
  "100 x 100 mm": [
    {"quantity": "x500", "costWithLam": 259, "margins": {"0.6": 414, "0.7": 440, "0.8": 466, "0.9": 492, "1.0": 518}, "stickySitchPrice": 345, "profit": 86, "productType": "circleSquare"},
    {"quantity": "x1000", "costWithLam": 259, "margins": {"0.5": 389, "0.6": 414, "0.7": 440, "0.8": 466, "0.9": 492, "1.0": 518}, "stickySitchPrice": 440.3, "profit": 181.3, "productType": "circleSquare"},
    {"quantity": "x2000", "costWithLam": 259, "margins": {"0.5": 389, "0.6": 414, "0.7": 440, "0.8": 466, "0.9": 492, "1.0": 518}, "stickySitchPrice": 518, "profit": 259, "productType": "circleSquare"},
    {"quantity": "x5000", "costWithLam": 329, "margins": {"0.5": 494, "0.6": 526, "0.7": 559, "0.8": 592, "0.9": 625, "1.0": 658}, "stickySitchPrice": 658, "profit": 329, "productType": "circleSquare"},
    {"quantity": "x10000", "costWithLam": 473, "margins": {"0.5": 710, "0.6": 757, "0.7": 804, "0.8": 851, "0.9": 899, "1.0": 946}, "stickySitchPrice": 898.7, "profit": 425.7, "productType": "circleSquare"}
  ],
  "125 x 125 mm": [
    {"quantity": "x500", "costWithLam": 338, "margins": {"0.6": 541, "0.7": 575, "0.8": 608, "0.9": 642, "1.0": 676}, "stickySitchPrice": 451, "profit": 113, "productType": "circleSquare"},
    {"quantity": "x1000", "costWithLam": 338, "margins": {"0.5": 507, "0.6": 541, "0.7": 575, "0.8": 608, "0.9": 642, "1.0": 676}, "stickySitchPrice": 574.6, "profit": 236.6, "productType": "circleSquare"},
    {"quantity": "x2000", "costWithLam": 338, "margins": {"0.5": 507, "0.6": 541, "0.7": 575, "0.8": 608, "0.9": 642, "1.0": 676}, "stickySitchPrice": 676, "profit": 338, "productType": "circleSquare"},
    {"quantity": "x5000", "costWithLam": 429, "margins": {"0.5": 644, "0.6": 686, "0.7": 729, "0.8": 772, "0.9": 815, "1.0": 858}, "stickySitchPrice": 858, "profit": 429, "productType": "circleSquare"},
    {"quantity": "x10000", "costWithLam": 617, "margins": {"0.5": 926, "0.6": 987, "0.7": 1049, "0.8": 1111, "0.9": 1172, "1.0": 1234}, "stickySitchPrice": 1172.3, "profit": 555.3, "productType": "circleSquare"}
  ],
  "150 x 150 mm": [
    {"quantity": "x500", "costWithLam": 486, "margins": {"0.6": 778, "0.7": 826, "0.8": 875, "0.9": 923, "1.0": 972}, "stickySitchPrice": 649, "profit": 163, "productType": "circleSquare"},
    {"quantity": "x1000", "costWithLam": 486, "margins": {"0.5": 729, "0.6": 778, "0.7": 826, "0.8": 875, "0.9": 923, "1.0": 972}, "stickySitchPrice": 826.2, "profit": 340.2, "productType": "circleSquare"},
    {"quantity": "x2000", "costWithLam": 486, "margins": {"0.5": 729, "0.6": 778, "0.7": 826, "0.8": 875, "0.9": 923, "1.0": 972}, "stickySitchPrice": 972, "profit": 486, "productType": "circleSquare"},
    {"quantity": "x5000", "costWithLam": 617, "margins": {"0.5": 926, "0.6": 987, "0.7": 1049, "0.8": 1111, "0.9": 1172, "1.0": 1234}, "stickySitchPrice": 1234, "profit": 617, "productType": "circleSquare"},
    {"quantity": "x10000", "costWithLam": 887, "margins": {"0.5": 1331, "0.6": 1419, "0.7": 1508, "0.8": 1597, "0.9": 1685, "1.0": 1774}, "stickySitchPrice": 1685.3, "profit": 798.3, "productType": "circleSquare"}
  ]
};

// Budget rolls for quantities under 500
export const budgetRolls: BudgetRolls = {
  "30 x 30 mm": [
    {"quantity": "x100", "costWithLam": 60, "margins": {"0.5": 90, "0.8": 108}, "competitorOSP": 77, "recommendedSell": 69, "productType": "budget"},
    {"quantity": "x200", "costWithLam": 60, "margins": {"0.5": 90, "0.8": 108}, "competitorOSP": 91, "recommendedSell": 82, "productType": "budget"},
    {"quantity": "x300", "costWithLam": 60, "margins": {"0.5": 90, "0.8": 108}, "competitorOSP": 103, "recommendedSell": 93, "productType": "budget"},
    {"quantity": "x400", "costWithLam": 60, "margins": {"0.5": 90, "0.8": 108}, "competitorOSP": 115, "recommendedSell": 104, "productType": "budget"}
  ],
  "50 x 50 mm": [
    {"quantity": "x100", "costWithLam": 60, "margins": {"0.5": 90, "0.8": 108}, "competitorOSP": 108, "recommendedSell": 97, "productType": "budget"},
    {"quantity": "x200", "costWithLam": 60, "margins": {"0.5": 90, "0.8": 108}, "competitorOSP": 135, "recommendedSell": 122, "productType": "budget"},
    {"quantity": "x300", "costWithLam": 60, "margins": {"0.5": 90, "0.8": 108}, "competitorOSP": 155, "recommendedSell": 140, "productType": "budget"},
    {"quantity": "x400", "costWithLam": 60, "margins": {"0.5": 90, "0.8": 108}, "competitorOSP": 173, "recommendedSell": 156, "productType": "budget"}
  ],
  "100 x 100 mm": [
    {"quantity": "x100", "costWithLam": 60, "margins": {"0.5": 90, "0.8": 108}, "competitorOSP": 275, "recommendedSell": 248, "productType": "budget"},
    {"quantity": "x200", "costWithLam": 87, "margins": {"0.5": 131, "0.8": 157}, "competitorOSP": 352, "recommendedSell": 317, "productType": "budget"},
    {"quantity": "x300", "costWithLam": 117, "margins": {"0.5": 176, "0.8": 211}, "competitorOSP": 406, "recommendedSell": 365, "productType": "budget"}
  ]
};

// Rectangle/Oval shapes
export const rectangleOvalRolls: RectangleOvalRolls = {
  "30 x 45 mm": [
    {"quantity": "x500", "costWithLam": 120, "margins": {"0.5": 180, "0.6": 192, "0.7": 204, "0.8": 216, "0.9": 228, "1.0": 240}, "productType": "rectangleOval"},
    {"quantity": "x1000", "costWithLam": 120, "margins": {"0.5": 180, "0.6": 192, "0.7": 204, "0.8": 216, "0.9": 228, "1.0": 240}, "productType": "rectangleOval"},
    {"quantity": "x5000", "costWithLam": 151, "margins": {"0.5": 227, "0.6": 242, "0.7": 257, "0.8": 272, "0.9": 287, "1.0": 302}, "productType": "rectangleOval"}
  ],
  "50 x 75 mm": [
    {"quantity": "x500", "costWithLam": 140, "margins": {"0.6": 224, "0.7": 238, "0.8": 252, "0.9": 266, "1.0": 280}, "productType": "rectangleOval"},
    {"quantity": "x1000", "costWithLam": 140, "margins": {"0.5": 210, "0.6": 224, "0.7": 238, "0.8": 252, "0.9": 266, "1.0": 280}, "productType": "rectangleOval"},
    {"quantity": "x5000", "costWithLam": 178, "margins": {"0.5": 267, "0.6": 285, "0.7": 303, "0.8": 320, "0.9": 338, "1.0": 356}, "productType": "rectangleOval"}
  ]
};

// Sheeted stickers with detailed cost breakdown
export const sheetedStickers: SheetedStickers = {
  "30 x 30 mm": [
    {"quantity": "x30", "sheetsNeeded": 1, "materialCost": 0.23, "inkCost": 0.25, "totalCost": 10.48, "gigiPrice": 26, "shippingPackaging": 10, "ourSellPrice": 27, "profit": 16, "finalSellPrice": 47, "productType": "sheeted"},
    {"quantity": "x100", "sheetsNeeded": 3, "materialCost": 0.68, "inkCost": 0.75, "totalCost": 11.43, "gigiPrice": 30, "shippingPackaging": 10, "ourSellPrice": 28, "profit": 16, "finalSellPrice": 48, "productType": "sheeted"},
    {"quantity": "x500", "sheetsNeeded": 11, "materialCost": 2.5, "inkCost": 2.74, "totalCost": 15.24, "gigiPrice": 50, "shippingPackaging": 10, "ourSellPrice": 43, "profit": 27, "finalSellPrice": 63, "productType": "sheeted"},
    {"quantity": "x1000", "sheetsNeeded": 21, "materialCost": 4.78, "inkCost": 5.24, "totalCost": 20.02, "gigiPrice": 70, "shippingPackaging": 10, "ourSellPrice": 60, "profit": 39, "finalSellPrice": 80, "productType": "sheeted"}
  ]
}; 