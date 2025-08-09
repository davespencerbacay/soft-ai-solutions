import { USERS_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => USERS_URL,
      keepUnusedDataFor: 5,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: credentials, 
      }),
    }),
    getUserById: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        params: { key: "UserId" },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useLoginMutation, useGetUserByIdQuery } = usersApiSlice;
