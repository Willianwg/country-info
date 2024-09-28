# Country Info App

This project consists of a frontend built with **Next.js** and a backend built with **Nest.js**. The application provides information about countries, including name, flag, bordering countries, and historical population data.

## Project Structure

The repository is divided into two main parts:
- **Frontend (Next.js)**: Located in the `frontend/` folder.
- **Backend (Nest.js)**: Located in the `backend/` folder.

Both applications need to be run simultaneously on different ports.

## Prerequisites

Make sure you have the following tools installed:
- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **Git**

## Environment Variables

### Backend (Nest.js)

Create a `.env` file in the root of the `backend/` folder with the following content:
PORT=3001  
COUNTRY_LIST_API_URL=https://date.nager.at/api/v3/AvailableCountries  
COUNTRY_INFO_API_URL=https://countriesnow.space/api/v0.1/countries  

### Frontend (Next.js)

Create a `.env.local` file in the root of the `frontend/` folder with the following content:
API_URL=http://localhost:3001  

## Installation

### Cloning the Repository

Clone this repository to your local machine:
git clone https://github.com/your-username/country-info-app.git  
cd country-info-app  

### Backend

1. Navigate to the backend folder:
cd backend  

2. Install the dependencies:
npm install  
# or  
yarn install  

3. Start the server:
npm run start  
# or  
yarn start  

The backend will be running on port `3001` by default.

### Frontend

1. Navigate to the frontend folder:
cd ../frontend  

2. Install the dependencies:
npm install  
# or  
yarn install  

3. Start the server:
npm run dev  
# or  
yarn dev  

The frontend will be running on port `3000` by default and will communicate with the backend on port `3001`.

## Running the Project

- **Backend**: Access [http://localhost:3001](http://localhost:3001) to check the API functionality.
- **Frontend**: Access [http://localhost:3000](http://localhost:3000) to view the React/Next.js application.

The frontend consumes the backend API to display detailed information about the countries.

## Testing

### Backend
To run the tests in the backend (Nest.js), use the following command:
npm run test  
# or  
yarn test  

### Frontend
To run the tests in the frontend (Next.js), use the following command:
npm run test  
# or  
yarn test  

## API Documentation

- **Country List API**: [Nager.Date API Documentation](https://date.nager.at/swagger/index.html)
- **Country Info API**: [Postman Country Info API Documentation](https://documenter.getpostman.com/view/1134062/T1LJjU52)

## ESLint and Prettier

This project uses **ESLint** and **Prettier** to ensure code quality and consistent formatting. Make sure the settings are appropriate in your code editor.
