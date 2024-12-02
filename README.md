# Country Data Dashboard

This project is a full-stack web application that displays country information using the REST Countries API. It consists of a frontend built with React/Next.js and a backend built with Node.js/Express.

## Project Structure

- `frontend/`: Contains the code for the frontend (React/Next.js).
- `backend/`: Contains the code for the backend (Node.js/Express).

## Prerequisites

- Node.js (v14.x or higher)
- npm or yarn or pnpm

## EXPRESS Country Data backend

To run the backend in development mode, use the following command:

    - npm run dev

    - This will start the server with nodemon, so it will automatically restart on file changes.

    The backend will run on http://localhost:3001.

`API Endpoints`

GET
`/api/countries`: Fetches a list of all countries.
GET
`/api/countries/search`: Searches for countries based on query parameters such as name, region, and page.
GET
`/api/countries/:code`: Fetches a single country by its code (e.g., /api/countries/IN for India).

`Example Usage:` - Search countries (e.g., by name): - GET /api/countries/search?name=India - Search countries by region: - GET /api/countries/search?region=Asia

`Backend Tests` - Jest - npm install --save-dev jest supertest
`Test Cases` - /countries - /api/countries/search - Testing Error Handling

## NEXTJS FRONTEND

Running the Frontend

To run the frontend in development mode, use the following command:
`npm run dev`

The frontend will run on http://localhost:3000.

## Folder Structure

country-data-frontend/
├── public/
│ └── index.html # Main HTML file
├── src/
│ ├── assets/ # Static assets like images, fonts, etc.
│ ├── components/ # React components
│ │ ├── CountryGrid.tsx
│ │ ├── SearchBar.tsx
│ │ └── CountryList.tsx
│ ├── hooks/ # Custom hooks
│ ├── pages/ # Page components
│ ├── utils/ # Helper functions like debounce
│ ├── App.tsx # Main App component
│ ├── index.tsx # React entry point
└── package.json

## Key Components:

    - CountryList.tsx: Displays the list of countries with search and filter options.
    - CountryGrid.tsx: Displays countries in a grid format.
    - SearchBar.tsx: A search input field to filter countries by name or region.
    - useDebounce.ts: Custom hook to debounce the search input.

`Frontend Tests` - Jest and React Testing Library - npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest
`Test Cases Components and Pages` - CountryList - CountryList Search - CountryList Search and Region Filter
