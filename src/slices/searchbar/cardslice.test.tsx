import { setupStore } from '@/store';
import { searchBarSlice } from './searchbarSlice';

describe('searchQuery tests', () => {
  it('should trigger a change', async () => {
    const store = setupStore();
    const testVal = '134567';

    const action = searchBarSlice.actions.change(testVal);
    // Act
    store.dispatch(action);

    let updatedState = store.getState();
    expect(updatedState.searchBar.query).toBe(testVal);
  });
});
