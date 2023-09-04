import { Industries } from '../~global-interfaces/industries.interface';

export var industries: Industries[] = [
  {
    description: 'Technology',
    superSectors: [
      {
        description: 'Technology',
        sectors: [
          {
            description: 'Software and Computer Services',
            subSectors: [
              'Computer Services',
              'Software',
              'Consumer Digital Services',
            ],
          },
          {
            description: 'Technology Hardware and Equipment',
            subSectors: [
              'Semiconductors',
              'Electronic Components',
              'Production Technology Equipment',
              'Computer Hardware',
              'Electronic Office Equipment',
            ],
          },
        ],
      },
    ],
  },

  {
    description: 'Telecommunications',
    superSectors: [
      {
        description: 'Telecommunications',
        sectors: [
          {
            description: 'Telecommunications Equipment',
            subSectors: ['Telecommunications Equipment'],
          },
          {
            description: 'Telecommunications Service Providers',
            subSectors: [
              'Cable Television Services',
              'Telecommunications Services',
            ],
          },
        ],
      },
    ],
  },
];

// Health Care	Health Care	Health Care Providers	Health Care Facilities
// Health Care	Health Care	Health Care Providers	Health Care Management Services
// Health Care	Health Care	Health Care Providers	Health Care Services
// Health Care	Health Care	Health Care Providers	Health Care: Misc.
// Health Care	Health Care	Medical Equipment and Services	Medical Equipment
// Health Care	Health Care	Medical Equipment and Services	Medical Supplies
// Health Care	Health Care	Medical Equipment and Services	Medical Services
// Health Care	Health Care	Pharmaceuticals and Biotechnology	Biotechnology
// Health Care	Health Care	Pharmaceuticals and Biotechnology	Pharmaceuticals
// Health Care	Health Care	Pharmaceuticals and Biotechnology	Cannabis Producers
// Financials	Banks	Banks	Banks
// Financials	Financial Services	Finance and Credit Services	Consumer Lending
// Financials	Financial Services	Finance and Credit Services	Mortgage Finance
// Financials	Financial Services	Finance and Credit Services	Financial Data Providers
// Financials	Financial Services	Investment Banking and Brokerage Services	Diversified Financial Services
// Financials	Financial Services	Investment Banking and Brokerage Services	Asset Managers and Custodians
// Financials	Financial Services	Investment Banking and Brokerage Services	Investment Services
// Financials	Financial Services	Mortgage Real Estate Investment Trusts	Mortgage REITs: Diversified
// Financials	Financial Services	Mortgage Real Estate Investment Trusts	Mortgage REITs: Commercial
// Financials	Financial Services	Mortgage Real Estate Investment Trusts	Mortgage REITs: Residential
// Financials	Financial Services	Closed End Investments	Closed End Investments
// Financials	Financial Services	Open End and Miscellaneous Investment Vehicles	Open End and Miscellaneous Investment Vehicles
// Financials	Insurance	Life Insurance	Life Insurance
// Financials	Insurance	Non-life Insurance	Full Line Insurance
// Financials	Insurance	Non-life Insurance	Insurance Brokers
// Financials	Insurance	Non-life Insurance	Reinsurance
// Financials	Insurance	Non-life Insurance	Property and Casualty Insurance
// Real Estate	Real Estate	Real Estate Investment and Services	Real Estate Holding and Development
// Real Estate	Real Estate	Real Estate Investment and Services	Real Estate Services
// Real Estate	Real Estate	Real Estate Investment Trusts	Diversified REITs
// Real Estate	Real Estate	Real Estate Investment Trusts	Health Care REITs
// Real Estate	Real Estate	Real Estate Investment Trusts	Hotel and Lodging REITs
// Real Estate	Real Estate	Real Estate Investment Trusts	Industrial REITs
// Real Estate	Real Estate	Real Estate Investment Trusts	Infrastructure REITs
// Real Estate	Real Estate	Real Estate Investment Trusts	Office REITs
// Real Estate	Real Estate	Real Estate Investment Trusts	Residential REITs
// Real Estate	Real Estate	Real Estate Investment Trusts	Retail REITs
// Real Estate	Real Estate	Real Estate Investment Trusts	Storage REITs
// Real Estate	Real Estate	Real Estate Investment Trusts	Timber REITs
// Real Estate	Real Estate	Real Estate Investment Trusts	Other Specialty REITs
// Consumer Discretionary	Automobiles and Parts	Automobiles and Parts	Auto Services
// Consumer Discretionary	Automobiles and Parts	Automobiles and Parts	Tires
// Consumer Discretionary	Automobiles and Parts	Automobiles and Parts	Automobiles
// Consumer Discretionary	Automobiles and Parts	Automobiles and Parts	Auto Parts
// Consumer Discretionary	Consumer Products and Services	Consumer Services	Education Services
// Consumer Discretionary	Consumer Products and Services	Consumer Services	Funeral Parlors and Cemetery
// Consumer Discretionary	Consumer Products and Services	Consumer Services	Printing and Copying Services
// Consumer Discretionary	Consumer Products and Services	Consumer Services	Rental and Leasing Services: Consumer
// Consumer Discretionary	Consumer Products and Services	Consumer Services	Storage Facilities
// Consumer Discretionary	Consumer Products and Services	Consumer Services	Vending and Catering Service
// Consumer Discretionary	Consumer Products and Services	Consumer Services	Consumer Services: Misc.
// Consumer Discretionary	Consumer Products and Services	Household Goods and Home Construction	Home Construction
// Consumer Discretionary	Consumer Products and Services	Household Goods and Home Construction	Household Furnishings
// Consumer Discretionary	Consumer Products and Services	Household Goods and Home Construction	Household Appliance
// Consumer Discretionary	Consumer Products and Services	Household Goods and Home Construction	Household Equipment and Products
// Consumer Discretionary	Consumer Products and Services	Leisure Goods	Consumer Electronics
// Consumer Discretionary	Consumer Products and Services	Leisure Goods	Electronic Entertainment
// Consumer Discretionary	Consumer Products and Services	Leisure Goods	Toys
// Consumer Discretionary	Consumer Products and Services	Leisure Goods	Recreational Products
// Consumer Discretionary	Consumer Products and Services	Leisure Goods	Recreational Vehicles and Boats
// Consumer Discretionary	Consumer Products and Services	Leisure Goods	Photography
// Consumer Discretionary	Consumer Products and Services	Personal Goods	Clothing and Accessories
// Consumer Discretionary	Consumer Products and Services	Personal Goods	Footwear
// Consumer Discretionary	Consumer Products and Services	Personal Goods	Luxury Items
// Consumer Discretionary	Consumer Products and Services	Personal Goods	Cosmetics
// Consumer Discretionary	Media	Media	Entertainment
// Consumer Discretionary	Media	Media	Media Agencies
// Consumer Discretionary	Media	Media	Publishing
// Consumer Discretionary	Media	Media	Radio and TV Broadcasters
// Consumer Discretionary	Retail	Retailers	Diversified Retailers
// Consumer Discretionary	Retail	Retailers	Apparel Retailers
// Consumer Discretionary	Retail	Retailers	Home Improvement Retailers
// Consumer Discretionary	Retail	Retailers	Specialty Retailers
// Consumer Discretionary	Travel and Leisure	Travel and Leisure	Airlines
// Consumer Discretionary	Travel and Leisure	Travel and Leisure	Travel and Tourism
// Consumer Discretionary	Travel and Leisure	Travel and Leisure	Casinos and Gambling
// Consumer Discretionary	Travel and Leisure	Travel and Leisure	Hotels and Motels
// Consumer Discretionary	Travel and Leisure	Travel and Leisure	Recreational Services
// Consumer Discretionary	Travel and Leisure	Travel and Leisure	Restaurants and Bars
// Consumer Staples	Food, Beverage and Tobacco	Beverages	Brewers
// Consumer Staples	Food, Beverage and Tobacco	Beverages	Distillers and Vintners
// Consumer Staples	Food, Beverage and Tobacco	Beverages	Soft Drinks
// Consumer Staples	Food, Beverage and Tobacco	Food Producers	Farming, Fishing, Ranching and Plantations
// Consumer Staples	Food, Beverage and Tobacco	Food Producers	Food Products
// Consumer Staples	Food, Beverage and Tobacco	Food Producers	Fruit and Grain Processing
// Consumer Staples	Food, Beverage and Tobacco	Food Producers	Sugar
// Consumer Staples	Food, Beverage and Tobacco	Tobacco	Tobacco
// Consumer Staples	Personal Care, Drug and Grocery Stores	Personal Care, Drug and Grocery Stores	Food Retailers and Wholesalers
// Consumer Staples	Personal Care, Drug and Grocery Stores	Personal Care, Drug and Grocery Stores	Drug Retailers
// Consumer Staples	Personal Care, Drug and Grocery Stores	Personal Care, Drug and Grocery Stores	Personal Products
// Consumer Staples	Personal Care, Drug and Grocery Stores	Personal Care, Drug and Grocery Stores	Nondurable Household Products
// Consumer Staples	Personal Care, Drug and Grocery Stores	Personal Care, Drug and Grocery Stores	Miscellaneous Consumer Staple Goods
// Industrials	Construction and Materials	Construction and Materials	Construction
// Industrials	Construction and Materials	Construction and Materials	Engineering and Contracting Services
// Industrials	Construction and Materials	Construction and Materials	Building, Roofing/Wallboard and Plumbing
// Industrials	Construction and Materials	Construction and Materials	Building: Climate Control
// Industrials	Construction and Materials	Construction and Materials	Cement
// Industrials	Construction and Materials	Construction and Materials	Building Materials: Other
// Industrials	Industrial Goods and Services	Aerospace and Defense	Aerospace
// Industrials	Industrial Goods and Services	Aerospace and Defense	Defense
// Industrials	Industrial Goods and Services	Electronic and Electrical Equipment	Electrical Components
// Industrials	Industrial Goods and Services	Electronic and Electrical Equipment	Electronic Equipment: Control and Filter
// Industrials	Industrial Goods and Services	Electronic and Electrical Equipment	Electronic Equipment: Gauges and Meters
// Industrials	Industrial Goods and Services	Electronic and Electrical Equipment	Electronic Equipment: Pollution Control
// Industrials	Industrial Goods and Services	Electronic and Electrical Equipment	Electronic Equipment: Other
// Industrials	Industrial Goods and Services	General Industrials	Diversified Industrials
// Industrials	Industrial Goods and Services	General Industrials	Paints and Coatings
// Industrials	Industrial Goods and Services	General Industrials	Plastics
// Industrials	Industrial Goods and Services	General Industrials	Glass
// Industrials	Industrial Goods and Services	General Industrials	Containers and Packaging
// Industrials	Industrial Goods and Services	Industrial Engineering	Machinery: Industrial
// Industrials	Industrial Goods and Services	Industrial Engineering	Machinery: Agricultural
// Industrials	Industrial Goods and Services	Industrial Engineering	Machinery: Construction and Handling
// Industrials	Industrial Goods and Services	Industrial Engineering	Machinery: Engines
// Industrials	Industrial Goods and Services	Industrial Engineering	Machinery: Tools
// Industrials	Industrial Goods and Services	Industrial Engineering	Machinery: Specialty
// Industrials	Industrial Goods and Services	Industrial Support Services	Industrial Suppliers
// Industrials	Industrial Goods and Services	Industrial Support Services	Transaction Processing Services
// Industrials	Industrial Goods and Services	Industrial Support Services	Professional Business Support Services
// Industrials	Industrial Goods and Services	Industrial Support Services	Business Training and Employment Agencies
// Industrials	Industrial Goods and Services	Industrial Support Services	Forms and Bulk Printing Services
// Industrials	Industrial Goods and Services	Industrial Support Services	Security Services
// Industrials	Industrial Goods and Services	Industrial Transportation	Trucking
// Industrials	Industrial Goods and Services	Industrial Transportation	Commercial Vehicles and Parts
// Industrials	Industrial Goods and Services	Industrial Transportation	Railroads
// Industrials	Industrial Goods and Services	Industrial Transportation	Railroad Equipment
// Industrials	Industrial Goods and Services	Industrial Transportation	Marine Transportation
// Industrials	Industrial Goods and Services	Industrial Transportation	Delivery Services
// Industrials	Industrial Goods and Services	Industrial Transportation	Commercial Vehicle-Equipment Leasing
// Industrials	Industrial Goods and Services	Industrial Transportation	Transportation Services
// Basic Materials	Basic Resources	Industrial Materials	Diversified Materials
// Basic Materials	Basic Resources	Industrial Materials	Forestry
// Basic Materials	Basic Resources	Industrial Materials	Paper
// Basic Materials	Basic Resources	Industrial Materials	Textile Products
// Basic Materials	Basic Resources	Industrial Metals and Mining	General Mining
// Basic Materials	Basic Resources	Industrial Metals and Mining	Iron and Steel
// Basic Materials	Basic Resources	Industrial Metals and Mining	Metal Fabricating
// Basic Materials	Basic Resources	Industrial Metals and Mining	Aluminum
// Basic Materials	Basic Resources	Industrial Metals and Mining	Copper
// Basic Materials	Basic Resources	Industrial Metals and Mining	Nonferrous Metals
// Basic Materials	Basic Resources	Precious Metals and Mining	Diamonds and Gemstones
// Basic Materials	Basic Resources	Precious Metals and Mining	Gold Mining
// Basic Materials	Basic Resources	Precious Metals and Mining	Platinum and Precious Metals
// Basic Materials	Chemicals	Chemicals	Chemicals: Diversified
// Basic Materials	Chemicals	Chemicals	Chemicals and Synthetic Fibers
// Basic Materials	Chemicals	Chemicals	Fertilizers
// Basic Materials	Chemicals	Chemicals	Specialty Chemicals
// Energy	Energy	Oil Gas and Coal	Integrated Oil and Gas
// Energy	Energy	Oil Gas and Coal	Oil: Crude Producers
// Energy	Energy	Oil Gas and Coal	Offshore Drilling and Other Services
// Energy	Energy	Oil Gas and Coal	Oil Refining and Marketing
// Energy	Energy	Oil Gas and Coal	Oil Equipment and Services
// Energy	Energy	Oil Gas and Coal	Pipelines
// Energy	Energy	Oil Gas and Coal	Coal
// Energy	Energy	Alternative Energy	Alternative Fuels
// Energy	Energy	Alternative Energy	Renewable Energy Equipment
// Utilities	Utilities	Electricity	Alternative Electricity
// Utilities	Utilities	Electricity	Conventional Electricity
// Utilities	Utilities	Gas, Water and Multi-utilities	Multi-Utilities
// Utilities	Utilities	Gas, Water and Multi-utilities	Gas Distribution
// Utilities	Utilities	Gas, Water and Multi-utilities	Water
// Utilities	Utilities	Waste and Disposal Services	Waste and Disposal Services
