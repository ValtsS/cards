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

  test('should work with info message', () => {
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
      jest.advanceTimersByTime(7000);
    });

    expect(result.current.state.error).toBe(false);
    expect(result.current.state.message).toBeUndefined();
    expect(result.current.state.queue.isEmpty()).toBe(true);
  });

  test('should work with error message', () => {
    const wrapper = ({ children }: { children: React.ReactElement }) => (
      <NotificationsProvider>{children}</NotificationsProvider>
    );
    const { result } = renderHook(() => useNotifications(), { wrapper });

    // Initial state
    expect(result.current.state.error).toBe(false);
    expect(result.current.state.queue.isEmpty()).toBe(true);

    act(() => {
      result.current.setMessage('Error', true);
    });

    expect(result.current.state.error).toBe(true);
    expect(result.current.state.message).toBe('Error');
    expect(result.current.state.queue.isEmpty()).toBe(false);

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    expect(result.current.state.error).toBe(false);
    expect(result.current.state.message).toBeUndefined();
    expect(result.current.state.queue.isEmpty()).toBe(true);
  });
});
