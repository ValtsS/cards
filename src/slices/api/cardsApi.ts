import { ResultsInfo, getCards } from '@/providers/card/api-client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Schema from '@/__generated__/graphql';
import { CardData } from '@/providers';
import { ApolloClient } from '@apollo/client';
import { RootState } from '@/store';

export type fetchParams = {
  client: ApolloClient<unknown>;
  params: Schema.CardFilterInput;
  limit: number;
  offset: number;
  order: Schema.CardSortInput[];
};

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (params: fetchParams, { rejectWithValue }) => {
    try {
      const { cards, info } = await getCards(
        params.client,
        params.params,
        params.limit,
        params.offset,
        params.order
      );

      const query = params.params.searchQuery;
      return { cards, info, query };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export enum StoreStatus {
  idle = 'idle',
  loading = 'loading',
  failed = 'failed',
  succeeded = 'succeeded',
}

interface CardsResultStore {
  cards: CardData[];
  info: ResultsInfo;
  status: StoreStatus;
  error?: string;
  query: string;
  errorcounter: number;
}

const intialState: CardsResultStore = {
  cards: [],
  info: { totalcount: 0 },
  status: StoreStatus.idle,
  query: '',
  errorcounter: 0,
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = StoreStatus.loading;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = StoreStatus.succeeded;
        state.cards = action.payload.cards;
        state.info = action.payload.info;
        state.error = undefined;
        state.query = action.payload.query;
        state.errorcounter = 0;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = StoreStatus.failed;
        state.error = action.payload as string;
        state.errorcounter++;
      });
  },
});

export const { reducer: cardsApiReducer } = cardsSlice;
export const selectApiCardsData = (state: RootState) => state.cardsAPI;
