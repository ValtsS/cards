import { createSlice } from '@/core/toolkitModule';
import { CardData } from '@/providers';
import { RootState } from '@/store/store';
import { PayloadAction } from '@reduxjs/toolkit';

interface CardStore {
  data: CardData[];
}

const intialState: CardStore = {
  data: [],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: intialState,
  reducers: {
    insertCard: (state, action: PayloadAction<CardData>) => {
      const card = action.payload;
      const lastcardUUID = state.data.length > 0 ? state.data[0].uuid : -1;
      if (card.uuid != lastcardUUID) state.data.unshift(card);
    },
  },
});

export const { insertCard } = cardsSlice.actions;

export const cardReducer = cardsSlice.reducer;

export const selectCardData = (state: RootState) => state.cards.data;
