import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  // development url for testing, change to production url when ready
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['User', 'Note'],
  endpoints: (builder: any): any => ({}),
});

export { apiSlice };
