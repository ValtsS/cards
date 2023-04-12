import { change, selectSearchQueryData } from '@/slices/searchbar/searchbarSlice';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

export interface UseReduxResult {
  queryString: string;
  handleChange: (filter: string | undefined) => string;
}

export const useRedux = (key: string): UseReduxResult => {
  const dispatch = useDispatch();
  const queryString = useSelector((state: RootState) => selectSearchQueryData(state, key)) ?? '';

  const handleChange = (filter: string | undefined): string => {
    const last = queryString;
    const apply = filter === undefined ? last : filter;

    if (apply != last) {
      dispatch(change({ key: key, value: apply }));
    }
    return apply;
  };

  return { queryString, handleChange };
};
