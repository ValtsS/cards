import { SortBy } from './api-provider';

describe('SortBy', () => {
  test('getSortingStr should return correct sorting strings', () => {
    const sortingStr = SortBy.getSortingStr([SortBy.Price_ASC, SortBy.Price_DESC]);

    expect(sortingStr).toContain('↑Price');
    expect(sortingStr).toContain('↓Price');
  });
});
