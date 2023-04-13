import { cardReducer } from '@/slices/card/cardSlice';
import { mainPageReducer } from '@/slices/mainpage/mainpageSlice';
import { notificationsReducer } from '@/slices/notifications/notificationsSlice';
import { searchBarReducer } from '@/slices/searchbar/searchbarSlice';
import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  cards: cardReducer,
  searchBar: searchBarReducer,
  mainPage: mainPageReducer,
  notifications: notificationsReducer,
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
