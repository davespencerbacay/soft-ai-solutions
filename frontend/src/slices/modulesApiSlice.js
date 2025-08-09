import { ADD_ACTION, DELETE_ACTION, EDIT_ACTION, MODULES_URL } from '../constants/constants';
import { apiSlice } from './apiSlice'; 

export const modulesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModules: builder.query({
      query: () => MODULES_URL,
      providesTags: (result = [], error, arg) =>
        result
          ? [
              ...result.map(({ ModuleId }) => ({ type: 'Module', id: ModuleId })),
              { type: 'Module', id: 'LIST' },
            ]
          : [{ type: 'Module', id: 'LIST' }],
    }),
    addModule: builder.mutation({
      query: (moduleData) => ({
        url: `${MODULES_URL}?action=${ADD_ACTION}`,
        method: 'POST',
        body: moduleData,
      }),
      invalidatesTags: [{ type: 'Module', id: 'LIST' }],
    }),
    updateModule: builder.mutation({
      query: ({ id, data }) => ({
        url: `${MODULES_URL}/${id}?action=${EDIT_ACTION}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Module', id }],
    }),
    deleteModule: builder.mutation({
      query: (id) => ({
        url: `${MODULES_URL}/${id}?action=${DELETE_ACTION}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Module', id }, { type: 'Module', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetModulesQuery,
  useAddModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
} = modulesApiSlice;
