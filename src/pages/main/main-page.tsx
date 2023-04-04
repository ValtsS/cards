import { CardShell } from '@/components/card-shell';
import { SearchBar } from '@/components/searchbar';
import { useAppContext } from '@/providers';
import { useCardsApiContext } from '@/providers/card/api-provider';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

interface MainPageProps {
  onSearch?: (searchQuery: string) => void;
}
export interface MainPageState {
  filteringBy?: string;
}

const mainpageLastQuery = `mainpage_lastquery`;

export const MainPage = (props: MainPageProps): ReactElement => {
  const { localStore } = useAppContext();
  const { state: cardsState, loadCards } = useCardsApiContext();

  const [state, setState] = useState<MainPageState>();

  const handleQueryChange = useCallback(
    async (searchQuery: string) => {
      if (state?.filteringBy !== searchQuery) {
        console.log('changed', searchQuery);

        setState((prevState) => ({
          ...prevState,
          filteringBy: searchQuery,
        }));

        await loadCards(searchQuery);

        localStore.setItem(mainpageLastQuery, searchQuery);
        if (props.onSearch) props.onSearch(searchQuery);
      }
    },
    [localStore, props, loadCards, state?.filteringBy]
  );

  useEffect(() => {
    const searched = localStore.getItem(mainpageLastQuery);
    handleQueryChange(searched ?? '');
  }, [localStore, loadCards, handleQueryChange]);

  return (
    <>
      <SearchBar
        id={'bar01'}
        onQueryChange={handleQueryChange}
        testId="search-bar-test-id"
        title="Enter search query"
      />
      <>
        <span>
          <>Loading:</>
          {cardsState.loading ? 'Loading' : 'Ready'}
        </span>
        <CardShell data={cardsState.cards} query={state?.filteringBy ?? ''} />
      </>
    </>
  );
};
