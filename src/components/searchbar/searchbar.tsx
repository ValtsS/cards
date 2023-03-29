import { useAppContext } from '@/providers/app-context-provider';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import './searchbar.css';

interface SearchProps {
  id: string;
  onQueryChange: (searchQuery: string) => void;
  testId?: string;
  title?: string;
}

interface LocalSearchState {
  query: string;
  contextReady: boolean;
}

export const SearchBar = (props: SearchProps): ReactElement => {
  const { localStore } = useAppContext();

  const getKey = (): string => {
    return `searchbar_${props.id}_lastquery`;
  };

  const initialState: LocalSearchState = {
    contextReady: false,
    query: '',
  };

  const lastQueryRef = useRef<string>('');

  const [state, setState] = useState(initialState);

  const getFromStore = (): string => {
    return localStore.getItem(getKey()) ?? '';
  };

  const saveToStore = (val: string) => localStore.setItem(getKey(), val);

  useEffect(() => {
    const loaded = getFromStore();
    if (loaded) {
      lastQueryRef.current = loaded;
      setState({
        contextReady: true,
        query: loaded,
      });
    }
    return () => {
      if (lastQueryRef.current) saveToStore(lastQueryRef.current);
    };
  }, [localStore]);

  const handleChange = (filter: string | undefined, search: boolean) => {
    const last = state.query;
    const apply = filter === undefined ? last : filter;

    if (apply != last) {
      lastQueryRef.current = apply;
      setState({
        ...state,
        query: apply,
      });
    }

    if (search) {
      saveToStore(apply);
      props.onQueryChange(apply);
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value, false);
  };

  const handleSearch = () => {
    handleChange(undefined, true);
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
                value={state.query}
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
