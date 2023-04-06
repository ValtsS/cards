import { APIState, CardShell, FloatNotification, SearchBar } from '@/components';
import Overlay from '@/components/overlay/overlay';
import { useAppContext } from '@/providers';
import { useCardsApiContext } from '@/providers/card/api-provider';
import { useNotifications } from '@/providers/shell-notifcations/shell-notifications';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

interface MainPageProps {
  onSearch?: (searchQuery: string) => void;
}
const mainpageLastQuery = 'mainpage_lastquery_key';

export const MainPage = (props: MainPageProps): ReactElement => {
  const { localStore } = useAppContext();

  const { setMessage } = useNotifications();

  const { state, loadCards } = useCardsApiContext();

  const [modal, setModal] = useState<boolean>(false);

  const handleQueryChange = useCallback(
    async (searchQuery: string) => {
      console.log('changed', searchQuery);
      try {
        if (state.errorcounter < 5) {
          localStore.setItem(mainpageLastQuery, searchQuery);

          await loadCards(searchQuery);
        } else {
          setMessage('giving up due to multiple API server errors :-(', true);
        }
      } catch (error) {
        setMessage('API call failed', true);
      }
      if (props.onSearch) props.onSearch(searchQuery);
    },
    [localStore, props, loadCards, state.errorcounter, setMessage]
  );

  useEffect(() => {
    const prevQuery = localStore.getItem(mainpageLastQuery) ?? '';
    handleQueryChange(prevQuery);
  }, [localStore, handleQueryChange]);

  const { state: notify } = useNotifications();

  const showModal = useCallback(() => {
    console.log('!!');

    setModal(true);
  }, []);

  return (
    <>
      <Overlay isOpen={modal} onClose={() => setModal(false)}>
        HAHA
      </Overlay>
      <SearchBar
        id={'bar01'}
        onQueryChange={handleQueryChange}
        testId="search-bar-test-id"
        title="Enter search query"
      />
      <APIState {...state} />
      <button onClick={showModal}>Test</button>

      <FloatNotification message={notify.message} error={notify.error} />
      <CardShell data={state.cards} query={state.filteringBy} />
    </>
  );
};
