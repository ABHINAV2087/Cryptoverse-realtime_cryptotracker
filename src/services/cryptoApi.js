import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders = {
  'accept': 'application/json',
  'x-cg-demo-api-key': import.meta.env.VITE_CG_API_KEY,  
};


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
  baseQuery, 
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: ({ vsCurrency = 'usd', count = 100, page = 1 }) =>
        `coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=${count}&page=${page}`,
    }),
    getCryptoStats: builder.query({
      query: () => `global`, 
    }),
    getCryptosExchanges: builder.query({
      query: () => `exchanges`, 
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => `/coins/${coinId}`,  
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, vsCurrency = 'usd',timeperiod }) => `/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${timeperiod}`,  
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
