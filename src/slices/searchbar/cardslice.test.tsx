import { setupStore } from '@/store';
import { searchBarSlice } from './searchbarSlice';

describe('searchQuery tests', () => {
  it('should trigger a change', async () => {
    const store = setupStore();

    const action = searchBarSlice.actions.change('134567');
    // Act
    store.dispatch(action);

    let updatedState = store.getState();
    expect(updatedState.searchBar.query).toBe('134567');
  });
});
