import { CardData } from 'providers/card-provider';

export interface MainPageState {
  searchstring?: string;
  cards?: CardData[];
}
