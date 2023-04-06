import { SearchBar } from '@/components';
import { CardShellLoader } from '@/components/card-shell-loader';
import { useAppContext } from '@/providers';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

interface MainPageProps {
  onSearch?: (searchQuery: string) => void;
}
const mainpageLastQuery = 'mainpage_lastquery_key';

export const MainPage = (props: MainPageProps): ReactElement => {
  const { localStore } = useAppContext();
  const [query, setQuery] = useState('');

  const handleQueryChange = useCallback(
    async (searchQuery: string) => {
      console.log('changed', searchQuery);
      localStore.setItem(mainpageLastQuery, searchQuery);
      setQuery(searchQuery);
    },
    [localStore]
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
      <CardShellLoader query={query} />
    </>
  );
};
