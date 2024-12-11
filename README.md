# Country Data Dashboard

This project is a full-stack web application that displays country information using the REST Countries API. It consists of a frontend built with React/Next.js and a backend built with Node.js/Express.

## Project Structure

- `frontend/`: Contains the code for the frontend (React,React-router-dom).
- `backend/`: Contains the code for the backend (Node.js/Express).
  
## Prerequisites

- Node.js (v14.x or higher)
- npm or yarn or pnpm

I have chnaged the code from typescript to javascript.

•	Country List Page: Displays a list of all countries with basic information: name, flag, and region. (Done )
•	Uses a Card component to display country details including the current time in the 12-hour format based on the country’s timezone. (done)
•	Lazy-Loading and Infinite Scroll: Implements lazy loading to load countries in batches, improving performance by loading only when needed. (Instead implemented pagination with numbers)
•	Country Detail Page: Displays detailed information about the selected country such as population, currency, languages, and more. (done)
•	Search and Filter: A search bar allows users to search for countries by name, capital, and time zone -(search based on country)
•	Filter countries by region using a dropdown menu. (done)

