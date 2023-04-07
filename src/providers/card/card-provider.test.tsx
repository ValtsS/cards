import { CardData, CardProviderStore } from './card-provider';
import * as Schema from '@/__generated__/graphql';
import { SortEnumType } from '@/__generated__/graphql';
import { SortBy } from './api-provider';

describe('Card provider', () => {
  it('should provide', () => {
    const prov = new CardProviderStore();
    expect(prov.data.length).toBe(0);
    const dummy = new CardData();
    prov.insert(dummy);
    expect(prov.data.length).toBe(1);
    prov.insert(dummy);
    expect(prov.data.length).toBe(1);
    prov.insert(new CardData());
    expect(prov.data.length).toBe(2);
  });

  it('should generate guids', () => {
    const card = new CardData();
    expect(card.uuid).toBe((CardData.counter - 1).toString());
    expect(new CardData().uuid).not.toBe(card.uuid);
  });
});

describe('SortBy', () => {
  it('should return correct sorting string for Price_ASC', () => {
    const sortingInput: Schema.CardSortInput[] = [SortBy.Price_ASC];
    const result = SortBy.getSortingStr(sortingInput);
    expect(result).toEqual(['↑Price']);
  });

  it('should return correct sorting string for Price_DESC', () => {
    const sortingInput: Schema.CardSortInput[] = [SortBy.Price_DESC];
    const result = SortBy.getSortingStr(sortingInput);
    expect(result).toEqual(['↓Price']);
  });

  it('should return empty array for empty sorting input', () => {
    const sortingInput: Schema.CardSortInput[] = [];
    const result = SortBy.getSortingStr(sortingInput);
    expect(result).toEqual([]);
  });

  it('should return correct sorting string for multiple sorting inputs', () => {
    const sortingInput: Schema.CardSortInput[] = [SortBy.Price_ASC, SortBy.Price_DESC];
    const result = SortBy.getSortingStr(sortingInput);
    expect(result).toEqual(['↑Price', '↓Price']);
  });

  it('should return empty array for unknown sorting input', () => {
    const sortingInput: Schema.CardSortInput[] = [];
    const result = SortBy.getSortingStr(sortingInput);
    expect(result).toEqual([]);
  });
});
