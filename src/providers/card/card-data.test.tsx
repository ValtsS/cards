import * as Schema from '@/__generated__/graphql';
import { SortBy } from './api-provider';
import { Cards } from './card-data';

describe('Card provider', () => {
  it('should allocate', () => {
    const dummy = Cards.alloc();
    expect(dummy).toBeTruthy();
    expect(dummy.uuid).toBeTruthy();
  });

  it('should generate guids', () => {
    const card = Cards.alloc();
    expect(card.uuid).toBe((Cards.counter - 1).toString());
    expect(Cards.alloc().uuid).not.toBe(card.uuid);
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
