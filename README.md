# Sticky Sitch Pricing Calculator

A modern, responsive web application for generating quick quotes for Circle or Square BOPP w/ LAM products.

## Features

- **Interactive Pricing Calculator**: Select size, quantity, and profit margin to get instant quotes
- **Multiple Pricing Options**: View all available margin options with real-time price updates
- **Modern UI**: Beautiful gradient design with smooth animations and transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **TypeScript**: Fully typed for better development experience and reliability
- **Real-time Updates**: Prices update instantly when selections change

## Technology Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **React Hooks**: State management and side effects

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stickysitch-calc
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── PricingCalculator.tsx  # Main calculator component
│   └── PricingGrid.tsx        # Pricing options grid
├── data/              # Static data
│   └── pricing.ts     # Pricing data constants
└── types/             # TypeScript type definitions
    └── pricing.ts     # Pricing-related types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pricing Data Structure

The application uses a structured pricing model with:

- **Sizes**: Various dimensions (30x30mm to 150x150mm)
- **Quantities**: Different quantity tiers (500 to 10,000+ pieces)
- **Margins**: Flexible profit margins (50% to 100%)
- **Base Costs**: Manufacturing costs with lamination

## Customization

### Adding New Sizes

Edit `src/data/pricing.ts` to add new size options:

```typescript
"NEW_SIZE": [
  {
    "quantity": "x500",
    "costWithLam": 100,
    "margins": {
      "0.5": 150,
      "0.6": 160,
      // ... more margins
    },
    "stickySitchPrice": 150,
    "profit": 50
  }
]
```

### Styling

The app uses Tailwind CSS. Modify styles in component files or add custom CSS to `globals.css`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms

Build the app and deploy the `out` folder:

```bash
npm run build
```

## Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.
