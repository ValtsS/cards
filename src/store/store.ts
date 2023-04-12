import { cardReducer } from '@/slices/card/cardSlice';
import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  cards: cardReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
