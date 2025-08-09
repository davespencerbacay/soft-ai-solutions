import { ROLES_URL } from '../constants/constants';
import { apiSlice } from './apiSlice'; 

export const rolesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRolesWithGroups: builder.query({
      query: () => `${ROLES_URL}?includeGroups=true`, 
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ RoleId }) => ({ type: 'Role', id: RoleId })),
              { type: 'Role', id: 'LIST' },
            ]
          : [{ type: 'Role', id: 'LIST' }],
    }),
    addRole: builder.mutation({
      query: (roleData) => ({
        url: ROLES_URL,
        method: 'POST',
        body: roleData,
      }),
      invalidatesTags: [{ type: 'Role', id: 'LIST' }],
    }),
    updateRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `${ROLES_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Role', id }],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `${ROLES_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Role', id }, { type: 'Role', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetRolesWithGroupsQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApiSlice;
