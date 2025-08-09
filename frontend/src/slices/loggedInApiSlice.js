import { LOGGED_IN_USER_PERMISSIONS_URL } from '../constants/constants';
import { apiSlice } from './apiSlice';

export const permissionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInPermissions: builder.query({
      query: () => `${LOGGED_IN_USER_PERMISSIONS_URL}/permissions`,
      providesTags: (result, error, arg) =>
        Array.isArray(result)
          ? [
              ...result.map((permission) => ({
                type: 'Permission',
                id: permission.PermissionId,
              })),
              { type: 'Permission', id: 'LIST' },
            ]
          : [{ type: 'Permission', id: 'LIST' }],
    }),
  }),
});

export const { useGetLoggedInPermissionsQuery } = permissionsApiSlice;
