import { setupStore } from '@/store';
import { cardsSlice } from './cardSlice';

describe('cardSlice tests', () => {
  it('should add a card', async () => {
    const store = setupStore();
    const cardData = { uuid: 'some-uuid', data: 'some-data' };
    const action = cardsSlice.actions.insertCard(cardData);

    // Act
    store.dispatch(action);

    let updatedState = store.getState();
    expect(updatedState.cards.data.length).toBe(1);
    expect(updatedState.cards.data[0]).toEqual(cardData);

    // Ignore duplicate
    store.dispatch(action);
    updatedState = store.getState();
    expect(updatedState.cards.data.length).toBe(1);
  });
});
