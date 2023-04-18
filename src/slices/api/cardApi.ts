import * as Schema from '@/__generated__/graphql';
import { CardData } from '@/providers';
import { getCard } from '@/providers/card/api-client';
import { ApolloClient } from '@apollo/client';
import { StoreStatus } from './cardsApi';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice } from '@/core/toolkitModule';

export const fetchCard = createAsyncThunk(
  'card/fetchCard',
  async (
    { client, params }: { client: ApolloClient<unknown>; params: Schema.CardFilterInput },
    { rejectWithValue }
  ) => {
    try {
      const card = await getCard(client, params);
      return { card };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

interface CardResultStore {
  card: CardData | null;
  status: StoreStatus;
  error?: string;
}

const intialState: CardResultStore = {
  status: StoreStatus.idle,
  card: null,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCard.pending, (state) => {
        state.status = StoreStatus.loading;
      })
      .addCase(fetchCard.fulfilled, (state, action) => {
        state.status = StoreStatus.succeeded;
        state.card = action.payload.card;
        state.error = undefined;
      })
      .addCase(fetchCard.rejected, (state, action) => {
        state.status = StoreStatus.failed;
        state.error = action.payload as string;
      });
  },
});

export const { reducer: cardApiReducer } = cardSlice;
export const selectApiCardData = (state: RootState) => state.cardAPI;
