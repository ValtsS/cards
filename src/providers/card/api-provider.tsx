import * as Schema from '@/__generated__/graphql';

export class SortBy {
  public static Price_ASC: Schema.CardSortInput = {
    price: Schema.SortEnumType.Asc,
  };

  public static Price_DESC: Schema.CardSortInput = {
    price: Schema.SortEnumType.Desc,
  };

  public static getSortingStr(ordering: Schema.CardSortInput[]): string[] {
    const results: string[] = [];

    ordering.forEach((o) => {
      let str = '';

      switch (o) {
        case SortBy.Price_ASC:
          str = '↑Price';
          break;

        case SortBy.Price_DESC:
          str = '↓Price';
          break;
      }

      results.push(str);
    });

    return results;
  }
}
