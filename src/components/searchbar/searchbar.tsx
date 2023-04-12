import React, { ReactElement } from 'react';
import { useLocalStore } from './searchbar-use-localstore';
import './searchbar.css';

interface SearchProps {
  id: string;
  onQueryChange: (searchQuery: string) => void;
  testId?: string;
  title?: string;
}

export const SearchBar = (props: SearchProps): ReactElement => {
  const { queryString, handleChange } = useLocalStore(`searchbar_${props.id}_lastquery`);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

  const handleSearch = () => {
    const query = handleChange(undefined);
    props.onQueryChange(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="search-container">
        <div>
          {props.title && <div>{props.title}</div>}
          {
            <>
              <input
                type="text"
                value={queryString}
                onChange={handleQueryChange}
                data-testid={props.testId}
                onKeyDown={handleKeyPress}
              />
              <button onClick={handleSearch}>Search</button>
            </>
          }
        </div>
      </div>
    </>
  );
};
