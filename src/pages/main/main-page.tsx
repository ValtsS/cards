import { CardShell } from '@/components/card-shell';
import { SearchBar } from '@/components/searchbar';
import { useAppContext } from '@/providers';
import { useCardsApiContext } from '@/providers/card/api-provider';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

interface MainPageProps {
  onSearch?: (searchQuery: string) => void;
}
const mainpageLastQuery = `mainpage_lastquery`;

export const MainPage = (props: MainPageProps): ReactElement => {
  const { localStore } = useAppContext();
  const { state: cardsState, loadCards } = useCardsApiContext();

  const [filteringBy, setFilteringBy] = useState('');

  const handleQueryChange = useCallback(
    async (searchQuery: string) => {
      console.log('changed', searchQuery);
      localStore.setItem(mainpageLastQuery, searchQuery);
      setFilteringBy(searchQuery);

      try {
        if (cardsState.errorcounter < 5) {
          await loadCards(searchQuery);
        } else {
          console.error('giving up due to error');
        }
      } catch (error) {
        console.error('API call failed:', error);
      }

      if (props.onSearch) props.onSearch(searchQuery);
    },
    [localStore, props, loadCards, cardsState.errorcounter]
  );

  useEffect(() => {
    const searched = localStore.getItem(mainpageLastQuery);
    setFilteringBy(searched || '');
  }, [localStore]);

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
        <CardShell data={cardsState.cards} query={filteringBy} />
      </>
    </>
  );
};
