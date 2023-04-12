import { CardData } from '@/providers';
import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    deleteCard: (state, action: PayloadAction<string>) => {
      const toRemoveUUID = action.payload;
      state.data = state.data.filter((x) => x.uuid !== toRemoveUUID);
    },
  },
});

export const { insertCard, deleteCard } = cardsSlice.actions;

export const cardReducer = cardsSlice.reducer;

export const selectCardData = (state: RootState) => state.cards.data;
