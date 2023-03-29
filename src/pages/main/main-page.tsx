import { CardShell } from '@/components/card-shell';
import { SearchBar } from '@/components/searchbar';
import { CardData, useAppContext } from '@/providers';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

interface MainPageProps {
  onSearch?: (searchQuery: string) => void;
}
export interface MainPageState {
  cards?: CardData[];
  filteringBy?: string;
  ready: boolean;
}

const mainpageLastQuery = `mainpage_lastquery`;

export const MainPage = (props: MainPageProps): ReactElement => {
  const { localStore, cardProvider } = useAppContext();

  const initialState: MainPageState = {
    ready: false,
  };

  const [state, setState] = useState(initialState);

  const handleQueryChange = useCallback(
    async (searchQuery: string) => {
      setState({
        cards: await cardProvider.loadTestData(searchQuery),
        filteringBy: searchQuery,
        ready: true,
      });
      localStore.setItem(mainpageLastQuery, searchQuery);
      if (props.onSearch) props.onSearch(searchQuery);
    },
    [localStore, cardProvider, props]
  );

  useEffect(() => {
    const searched = localStore.getItem(mainpageLastQuery);
    handleQueryChange(searched ?? '');
  }, [localStore, handleQueryChange]);

  return (
    <>
      <SearchBar
        id={'bar01'}
        onQueryChange={handleQueryChange}
        testId="search-bar-test-id"
        title="Enter search query"
      />

      <CardShell data={state.cards} query={state.filteringBy} />
    </>
  );
};
