import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Update your headers to match the new API's requirements
const cryptoNewsHeaders = {
  'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY, // 26f2cce53emsh709f1207472ecc2p141aa6jsn79bc65463b87
  'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com', // Use Vite's environment variable access
};

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cryptocurrency-news2.p.rapidapi.com', // Use Vite's environment variable access
    prepareHeaders: (headers) => {
      // Set the headers for the new API
      headers.set('x-rapidapi-key', cryptoNewsHeaders['x-rapidapi-key']);
      headers.set('x-rapidapi-host', cryptoNewsHeaders['x-rapidapi-host']);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => `/v1/cryptodaily`, // Update the query to match the new API's endpoint
    }), 
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
