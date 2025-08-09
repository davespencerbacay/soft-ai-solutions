import { PERMISSIONS_URL } from '../constants/constants';
import { apiSlice } from './apiSlice'; 

export const permissionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: () => PERMISSIONS_URL,
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ PermissionId }) => ({ type: 'Permission', id: PermissionId })),
              { type: 'Permission', id: 'LIST' },
            ]
          : [{ type: 'Permission', id: 'LIST' }],
    }),
    addPermission: builder.mutation({
      query: (permissionData) => ({
        url: PERMISSIONS_URL,
        method: 'POST',
        body: permissionData,
      }),
      invalidatesTags: [{ type: 'Permission', id: 'LIST' }],
    }),
    updatePermission: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PERMISSIONS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Permission', id }],
    }),
    deletePermission: builder.mutation({
      query: (id) => ({
        url: `${PERMISSIONS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Permission', id }, { type: 'Permission', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useAddPermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = permissionsApiSlice;
