import { CardShellLoader } from '@/components/card-shell-loader';
import { SearchBar } from '@/components/searchbar';
import { change, selectMainPageData } from '@/slices/mainpage/mainpageSlice';
import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface MainPageProps {
  onSearch?: (searchQuery: string) => void;
}

export const MainPage = (props: MainPageProps): ReactElement => {
  const dispatch = useDispatch();
  const query = useSelector(selectMainPageData);

  const handleQueryChange = useCallback(
    async (searchQuery: string) => {
      if (props.onSearch) props.onSearch(searchQuery);
      dispatch(change(searchQuery));
    },
    [props, dispatch]
  );

  useEffect(() => {
    handleQueryChange(query);
  }, [handleQueryChange, query]);

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
