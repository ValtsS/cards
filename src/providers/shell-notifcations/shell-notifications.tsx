import { Queue } from '@/core/queue';
import React, { ReactElement, useCallback, useContext } from 'react';
import { useReducer } from 'react';

type NotificationState = {
  message?: string;
  error: boolean;
  queue: Queue<{ message: string; error: boolean }>;
};

type NotificationAction =
  | { type: 'SET_MESSAGE'; message: string; error: boolean }
  | { type: 'CLEAR_MESSAGE' };

const initialState: NotificationState = {
  message: undefined,
  error: false,
  queue: new Queue<{ message: string; error: boolean }>(),
};

function reducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'SET_MESSAGE':
      console.log('Mesasge set', action.message);
      state.queue.enqueue({ message: action.message, error: action.error });
      return { ...state, message: action.message };
    case 'CLEAR_MESSAGE':
      console.log('Mesasge cleared');
      state.queue.dequeue();
      const next = state.queue.isEmpty() ? undefined : state.queue.peek();
      return { ...state, message: next?.message, error: next?.error ?? false };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

type NotificationsContextValue = {
  state: NotificationState;
  setMessage: (message: string, error: boolean) => void;
};

export const NotificationsContext = React.createContext<NotificationsContextValue>({
  state: initialState,
  setMessage: () => {},
});

export const NotificationsProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setMessage = useCallback(
    (message: string, error: boolean) => {
      dispatch({ type: 'SET_MESSAGE', message, error });
      setTimeout(
        () => {
          dispatch({ type: 'CLEAR_MESSAGE' });
        },
        error ? 5000 : 1000
      );
    },
    [dispatch]
  );
  const value = {
    state,
    setMessage,
  };

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export function useNotifications() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }

  return context;
}
