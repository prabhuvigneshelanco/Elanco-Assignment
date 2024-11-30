## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
The server would be running at http://localhost:3001

## APIS
The following APIs are available:
Get countries: [http://localhost:3001/countries]
Get country by code: [http://localhost:3001/countries/:code]
Get countries by region: [http://localhost:3001/countries/region/:region]
Search country by name: [http://localhost:3001/countries/search?name=xxxxx]
Search country by capital: [http://localhost:3001/countries/search?capital=xxxxx]
Search country by region: [http://localhost:3001/countries/search?region=xxxxx]
Search country by timezone: [http://localhost:3001/countries/search?timezone=xxxxx]