import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoNewsHeaders = {
  'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY, 
  'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com', 
};

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cryptocurrency-news2.p.rapidapi.com', 
    prepareHeaders: (headers) => {
      
      headers.set('x-rapidapi-key', cryptoNewsHeaders['x-rapidapi-key']);
      headers.set('x-rapidapi-host', cryptoNewsHeaders['x-rapidapi-host']);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => `/v1/cryptodaily`, 
    }), 
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
