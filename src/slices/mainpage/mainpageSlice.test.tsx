import { setupStore } from '@/store';
import { mainPageSlice } from './mainpageSlice';

describe('mainPage slice tests', () => {
  it('should trigger a change', async () => {
    const store = setupStore();
    const testVal = '134567';

    const action = mainPageSlice.actions.change(testVal);
    // Act
    store.dispatch(action);

    const updatedState = store.getState();
    expect(updatedState.mainPage.query).toBe(testVal);
  });
});
