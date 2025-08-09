import { USERS_URL } from "../constants/constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `${USERS_URL}?isGroupInclude=true`,
      keepUnusedDataFor: 5,
      providesTags: ['Users'],
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
    addUser: builder.mutation({
      query: (newUser) => ({
        url: USERS_URL,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users", "Group"], 
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Users", "Group"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `${USERS_URL}/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users", "Group"],
    }),
  }),
});

export const { useGetUsersQuery, useLoginMutation, useGetUserByIdQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } = usersApiSlice;
