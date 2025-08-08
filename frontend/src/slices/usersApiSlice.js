import { USERS_URL } from "../constants/constants";
import { apiSlice  } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { useGetUsersQuery } = usersApiSlice;