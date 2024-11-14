import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// @baseurl we have kept null because it takes the base url form  proxy which we have set in Vite.config.js
const baseQuery = fetchBaseQuery({ baseUrl: '' })

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({})
})