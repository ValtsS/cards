import { change, selectSearchQueryData } from '@/slices/searchbar/searchbarSlice';
import { useDispatch, useSelector } from 'react-redux';

export interface UseLocalStoreResult {
  queryString: string;
  handleChange: (filter: string | undefined, search: boolean) => string;
}

export const useLocalStore = (key: string): UseLocalStoreResult => {
  const dispatch = useDispatch();
  const queryString = useSelector(selectSearchQueryData);

  const handleChange = (filter: string | undefined, search: boolean): string => {
    const last = queryString;
    const apply = filter === undefined ? last : filter;

    if (apply != last) {
      dispatch(change(apply));
    }
    return apply;
  };

  return { queryString, handleChange };
};
