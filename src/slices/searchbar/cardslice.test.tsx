import { setupStore } from '@/store';
import { searchBarSlice } from './searchbarSlice';

describe('searchQuery tests', () => {
  it('should trigger a change', async () => {
    const store = setupStore();
    const testVal = '134567';

    const action = searchBarSlice.actions.change({ key: '1', value: testVal });
    // Act
    store.dispatch(action);

    const updatedState = store.getState();
    expect(updatedState.searchBar.query['1']).toBe(testVal);
  });
});
