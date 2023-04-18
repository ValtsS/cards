import { combineReducers, configureStore } from '@/core/toolkitModule';
import { cardApiReducer } from '@/slices/api/cardApi';
import { cardsApiReducer } from '@/slices/api/cardsApi';
import { cardReducer } from '@/slices/card/cardSlice';
import { mainPageReducer } from '@/slices/mainpage/mainpageSlice';
import { notificationsReducer } from '@/slices/notifications/notificationsSlice';
import { searchBarReducer } from '@/slices/searchbar/searchbarSlice';
import { PreloadedState } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  cards: cardReducer,
  searchBar: searchBarReducer,
  mainPage: mainPageReducer,
  notifications: notificationsReducer,
  cardsAPI: cardsApiReducer,
  cardAPI: cardApiReducer,
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
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
