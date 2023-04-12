import { RootState } from '@/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MainPageStore {
  query: string;
}

const intialState: MainPageStore = {
  query: '',
};

export const mainPageSlice = createSlice({
  name: 'mainpage',
  initialState: intialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { change } = mainPageSlice.actions;

export const mainPageReducer = mainPageSlice.reducer;

export const selectMainPageData = (state: RootState) => state.mainPage.query;
