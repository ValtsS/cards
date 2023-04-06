import React from 'react';
import { act, render, renderHook, screen } from '@testing-library/react';
import { NotificationsProvider, useNotifications } from './notifications-provider';

jest.useFakeTimers();

describe('Notifications provider', () => {
  test('should render children', () => {
    render(
      <NotificationsProvider>
        <div>Child Component</div>
      </NotificationsProvider>
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
  });

  test('should return context value when used within ModalDialogProvider', () => {
    const wrapper = ({ children }: { children: React.ReactElement }) => (
      <NotificationsProvider>{children}</NotificationsProvider>
    );
    const { result } = renderHook(() => useNotifications(), { wrapper });

    // Initial state
    expect(result.current.state.error).toBe(false);
    expect(result.current.state.queue.isEmpty()).toBe(true);

    act(() => {
      result.current.setMessage('Info', false);
    });

    expect(result.current.state.error).toBe(false);
    expect(result.current.state.message).toBe('Info');
    expect(result.current.state.queue.isEmpty()).toBe(false);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(result.current.state.error).toBe(false);
    expect(result.current.state.message).toBeUndefined();
    expect(result.current.state.queue.isEmpty()).toBe(true);
  });
});
