import { CardData } from 'providers/card-provider';

export interface FormerPageState {
  cards?: CardData[];
  ready: boolean;
}

export interface MainPageState {
  cards?: CardData[];
  filteringBy?: string;
  ready: boolean;
}
