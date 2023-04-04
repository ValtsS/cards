import { useAppContext } from '@/providers';
import { useRef, useState, useEffect } from 'react';

export interface LocalSearchState {
  query: string;
  contextReady: boolean;
}

export interface UseLocalStoreResult {
  state: LocalSearchState;
  handleChange: (filter: string | undefined, search: boolean) => string;
}

export const useLocalStore = (key: string): UseLocalStoreResult => {
  const { localStore } = useAppContext();
  const initialState: LocalSearchState = {
    contextReady: false,
    query: '',
  };

  const lastQueryRef = useRef<string>('');

  const [state, setState] = useState(initialState);

  const saveToStore = (val: string) => localStore.setItem(key, val);

  useEffect(() => {
    const getFromStore = (): string => {
      return localStore.getItem(key) ?? '';
    };

    const loaded = getFromStore();

    if (loaded) {
      lastQueryRef.current = loaded;
      setState({
        contextReady: true,
        query: loaded,
      });
    }
    return () => {
      if (lastQueryRef.current) localStore.setItem(key, lastQueryRef.current);
    };
  }, [localStore, key]);

  const handleChange = (filter: string | undefined, search: boolean): string => {
    const last = state.query;
    const apply = filter === undefined ? last : filter;

    if (apply != last) {
      lastQueryRef.current = apply;
      setState((prevState) => ({
        ...prevState,
        query: apply,
      }));
    }

    if (search) saveToStore(apply);
    return apply;
  };

  return { state, handleChange };
};
