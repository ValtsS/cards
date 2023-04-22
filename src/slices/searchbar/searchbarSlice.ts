import { createSlice } from '@/core/toolkitModule';
import { RootState } from '@/store';
import { PayloadAction } from '@reduxjs/toolkit';

interface SearchBarStore {
  query: { [key: string]: string };
}

const intialState: SearchBarStore = {
  query: {},
};

export const searchBarSlice = createSlice({
  name: 'searchbar',
  initialState: intialState,
  reducers: {
    change: (state, action: PayloadAction<{ key: string; value: string }>) => {
      const { key, value } = action.payload;
      state.query[key] = value;
    },
  },
});

export const { change } = searchBarSlice.actions;

export const searchBarReducer = searchBarSlice.reducer;

export const selectSearchQueryData = (state: RootState, key: string) => state.searchBar.query[key];
