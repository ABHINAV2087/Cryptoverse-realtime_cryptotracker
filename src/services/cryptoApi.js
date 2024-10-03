import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base headers configuration (you can remove this if no headers are needed)
const cryptoApiHeaders = {
  'accept': 'application/json',
  'x-cg-demo-api-key': import.meta.env.VITE_CG_API_KEY,  // Add this only if your API key is required
};

// Create base query with headers (optional if headers are needed)
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.coingecko.com/api/v3',
  prepareHeaders: (headers) => {
    headers.set('accept', cryptoApiHeaders['accept']);
    headers.set('x-cg-demo-api-key', cryptoApiHeaders['x-cg-demo-api-key']);
    return headers;
  },
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery,  // Use the baseQuery defined above
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: ({ vsCurrency = 'usd', count = 100, page = 1 }) =>
        `coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=${count}&page=${page}`,// Fetch based on currency  // Fetch the list of coins
    }),
    getCryptoStats: builder.query({
      query: () => `global`, // Fetch based on currency  // Fetch the list of coins
    }),
    getCryptosExchanges: builder.query({
      query: () => `exchanges`, 
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => `/coins/${coinId}`,  // Fetch details of a specific coin by its ID
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, vsCurrency = 'usd',timeperiod }) => `/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${timeperiod}`,  // Fetch market history
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetCryptosExchangesQuery,
  useGetCryptoStatsQuery
} = cryptoApi;
