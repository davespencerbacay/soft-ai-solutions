import { GROUPS_URL } from '../constants/constants';
import { apiSlice } from './apiSlice'; 

export const groupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroupsWithUsers: builder.query({
      query: () => `${GROUPS_URL}?user=true`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ GroupId }) => ({ type: 'Group', id: GroupId })),
              { type: 'Group', id: 'LIST' },
            ]
          : [{ type: 'Group', id: 'LIST' }],
    }),
    addGroup: builder.mutation({
      query: (groupData) => ({
        url: GROUPS_URL,
        method: 'POST',
        body: groupData,
      }),
      invalidatesTags: [{ type: 'Group', id: 'LIST' }],
    }),
    updateGroup: builder.mutation({
      query: ({ id, data }) => ({
        url: `${GROUPS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Group', id }, { type: 'Group', id: 'LIST' }],
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `${GROUPS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Group", id: "LIST" }],
    }),
    assignUsersToGroup: builder.mutation({
      query: ({ groupId, userIds }) => ({
        url: `${GROUPS_URL}/${groupId}/users`,
        method: 'POST',
        body: { userIds },
      }),
      invalidatesTags: ['Group', 'Users'],
    })
  }),
});

export const { useGetGroupsWithUsersQuery, useAddGroupMutation, useUpdateGroupMutation, useDeleteGroupMutation, useAssignUsersToGroupMutation } = groupsApiSlice;