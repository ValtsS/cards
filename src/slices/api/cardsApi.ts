import { ResultsInfo, getCards } from '@/providers/card/api-client';
import * as Schema from '@/__generated__/graphql';
import { CardData, SortBy } from '@/providers';
import { ApolloClient } from '@apollo/client';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice } from '@/core/toolkitModule';

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
      const limit = params.limit;
      const offset = params.offset;
      const orderBy = SortBy.getSortingStr(params.order).join(', ');
      return { cards, info, query, limit, offset, orderBy };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const enum StoreStatus {
  idle = 'idle',
  loading = 'loading',
  failed = 'failed',
  succeeded = 'succeeded',
}

export interface CardsResultStore {
  cards: CardData[];
  info: ResultsInfo;
  status: StoreStatus;
  error?: string;
  query: string;
  errorcounter: number;
  limit: number;
  offset: number;
  orderBy: string;
}

const intialState: CardsResultStore = {
  cards: [],
  info: { totalcount: 0 },
  status: StoreStatus.idle,
  query: '',
  errorcounter: 0,
  limit: 0,
  offset: 0,
  orderBy: '',
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
        state.limit = action.payload.limit;
        state.offset = action.payload.offset;
        state.orderBy = action.payload.orderBy;
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
