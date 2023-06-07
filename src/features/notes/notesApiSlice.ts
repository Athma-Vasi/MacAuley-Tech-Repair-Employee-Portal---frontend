import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const notesAdapter = createEntityAdapter({});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getnotes: builder.query({
      query: () => '/notes',
      //   validateStatus: (response: any, result: any) => {
      //     return response.status === 200 && !result.isError;
      //   },
      keepUnusedDataFor: 5,
      transformResponse: (responseData: any) => {
        const loadednotes = responseData.map((user: any) => {
          user.id = user._id;
          return user;
        });
        return notesAdapter.setAll(initialState, loadednotes);
      },
      providesTags: (result, _error) => {
        if (result?.ids) {
          return [
            { type: 'User' as const, id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'User' as const, id })),
          ];
        } else return [{ type: 'User' as const, id: 'LIST' }];
      },
    }),
  }),
});

export const { useGetnotesQuery } = notesApiSlice;

// returns the query result object
export const selectNotesResult =
  notesApiSlice.endpoints.getnotes.select('LIST');

// creates memoized selector
const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllNotes,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(
  (state: any): any => selectNotesData(state) ?? initialState
);
