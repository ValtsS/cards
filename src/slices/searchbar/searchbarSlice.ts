import { RootState } from '@/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchBarStore {
  query: string;
}

const intialState: SearchBarStore = {
  query: '',
};

export const searchBarSlice = createSlice({
  name: 'searchbar',
  initialState: intialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { change } = searchBarSlice.actions;

export const searchBarReducer = searchBarSlice.reducer;

export const selectSearchQueryData = (state: RootState) => state.searchBar.query;
