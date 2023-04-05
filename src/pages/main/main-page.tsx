import { CardShell } from '@/components/card-shell';
import { SearchBar } from '@/components/searchbar';
import { useAppContext } from '@/providers';
import { useCardsApiContext } from '@/providers/card/api-provider';
import React, { ReactElement, useCallback, useEffect } from 'react';

interface MainPageProps {
  onSearch?: (searchQuery: string) => void;
}
const mainpageLastQuery = `mainpage_lastquery`;

export const MainPage = (props: MainPageProps): ReactElement => {
  const { localStore } = useAppContext();

  const { state, loadCards } = useCardsApiContext();

  const handleQueryChange = useCallback(
    async (searchQuery: string) => {
      console.log('changed', searchQuery);
      try {
        if (state.errorcounter < 5) {
          await loadCards(searchQuery);
          localStore.setItem(mainpageLastQuery, searchQuery);
        } else {
          console.error('giving up due to error');
        }
      } catch (error) {
        console.error('API call failed:', error);
      }
      if (props.onSearch) props.onSearch(searchQuery);
    },
    [localStore, props, loadCards, state.errorcounter]
  );

  useEffect(() => {
    const prevQuery = localStore.getItem(mainpageLastQuery) ?? '';
    handleQueryChange(prevQuery);
  }, [localStore, handleQueryChange]);

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
          {state.loading ? 'Loading' : 'Ready'}
        </span>
        <CardShell data={state.cards} query={state.filteringBy} />
      </>
    </>
  );
};
