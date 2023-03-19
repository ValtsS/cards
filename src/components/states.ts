import { CardData } from 'providers/card-provider';

export interface MainPageState {
  cards?: CardData[];
  filteringBy?: string;
  ready: boolean;
}
