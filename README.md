# Cryptoverse

This project is a **Crypto Stats Dashboard** built using **React** ,**Redux**,**Firebase** etc which provides real-time data on global cryptocurrency statistics. It also features top 10 cryptocurrencies and the latest crypto news, making it a useful tool for keeping track of the cryptocurrency market.

## Demo

Check out the demo here: [Cryptoverse Demo](https://youtu.be/_phlHtZkKzA?si=UR2NvEqc9xvE7ybq)



## Features

- **Global Cryptocurrency Statistics**:
  - Total number of cryptocurrencies.
  - Total exchanges.
  - Global market capitalization.
  - 24-hour volume in USD.
  - Market cap change over the last 24 hours.
  - Last updated timestamp.
  - **Currency Change**: Users can switch between different fiat currencies (e.g., USD, INR) to view the statistics.

- **Cryptocurrency Overview**:
  - Displays an overview of all available cryptocurrencies.
  - Sort and filter options available to view the top 10 cryptocurrencies by market cap or other metrics.
  - **Currency Change**: Allows users to view the cryptocurrencies in their preferred fiat currency.

- **Latest Crypto News**:
  - Showcases the latest crypto-related news.
  - **Search Functionality**: Users can search for specific cryptocurrency news articles or topics of interest.
  - Option to see more news for deeper insights.

- **User Watchlist**:
  - Users can log in and add their favorite cryptocurrencies to a personalized watchlist.
  - Makes it easy to track specific coins.
  - **Currency Change**: Users can view their watchlist prices in the fiat currency of their choice.


## Tech Stack

- **React**: For building the user interface.
- **Redux Toolkit Query**: To manage API requests.
- **Firebase**: For Authentication and Database.
- **Material UI , Ant Design**: For UI components and layout.
- **millify**: For formatting large numbers (e.g., market cap, volume).
- **React Router**: For navigation between pages.
- **Rapid API**: To fetch cryptocurrency news.
- **Chart.js**: For displaying financial charts.
- **Axios**: For formatting dates and times.
- **Moment**: For making HTTP requests.
  
## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)


### Clone the repository

```bash
git clone https://github.com/ABHINAV2087/Cryptoverse-realtime_cryptotracker.git
cd Cryptoverse-realtime_cryptotracker
```

### Install dependencies

If you're using **npm**, run the following command to install both `dependencies` and `devDependencies`:

```bash
npm install
```

If you're using **yarn**, you can run:

```bash
yarn install
```

### 2. **Install dependencies individually (if needed)**

If for some reason you want to install them individually, you can do so using the following commands:

#### Using **npm**:

```bash
npm install @ant-design/icons @emotion/react @emotion/styled @material-tailwind/react @mui/joy @mui/lab @mui/material @mui/styles @reduxjs/toolkit antd axios chart.js chartjs-chart-financial firebase html-react-parser lodash.debounce millify moment npm react react-apexcharts react-chartjs-2 react-dom react-google-button react-redux react-router-dom react-toastify redux
```

To install dev dependencies:

```bash
npm install --save-dev @eslint/js @types/react @types/react-dom @vitejs/plugin-react eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh globals vite
```

#### Using **yarn**:

```bash
yarn add @ant-design/icons @emotion/react @emotion/styled @material-tailwind/react @mui/joy @mui/lab @mui/material @mui/styles @reduxjs/toolkit antd axios chart.js chartjs-chart-financial firebase html-react-parser lodash.debounce millify moment npm react react-apexcharts react-chartjs-2 react-dom react-google-button react-redux react-router-dom react-toastify redux
```

For dev dependencies:

```bash
yarn add @eslint/js @types/react @types/react-dom @vitejs/plugin-react eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh globals vite --dev
```

### 3. **Run the development server**

Once all dependencies are installed, you can start the development server using:

```bash
npm run dev
```

or if using yarn:

```bash
yarn dev
```

### Setup API



### CoinGecko API (Crypto Data)

- **Base URL**: `https://api.coingecko.com/api/v3`
- **Endpoints**:
  - `getCryptos`: Fetches market data for top cryptocurrencies.
  - `getCryptoStats`: Retrieves global crypto stats.
  - `getCryptoExchanges`: Lists all exchanges.
  - `getCryptoDetails`: Detailed information on a specific cryptocurrency.
  - `getCryptoHistory`: Historical data for a specific cryptocurrency.

### RapidAPI (Crypto News)

- **Base URL**: `https://cryptocurrency-news2.p.rapidapi.com`
- **Endpoint**:
  - `getCryptoNews`: Fetches the latest cryptocurrency news.

## Usage

You can use the custom hooks to fetch data and display it in your components.



### Run the project

Start the development server:

```bash
npm run dev
```

Or with yarn:

```bash
yarn start
```


## UI/UX

- **Ant Design** components, such as `Row`, `Col`, `Statistic`, and `Typography`, are used for a professional and responsive layout.
- **millify** is used to format large numbers for better readability.
- Custom colors are applied to various statistics based on their value (e.g., red for negative, green for positive).

## Usage

Once the project is set up, users can:

- View real-time global crypto statistics on the homepage.
- Check the top 10 cryptocurrencies by market cap.
- Read the latest news on the cryptocurrency market.

## License

This project is open-source and available under the [MIT License](LICENSE).

