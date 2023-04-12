import { setupStore } from '@/store';
import { cardsSlice } from './cardSlice';

describe('cardSlice tests', () => {
  it('should add a card', async () => {
    const store = setupStore();
    const cardData = { uuid: 'some-uuid', data: 'some-data' };
    const action = cardsSlice.actions.insertCard(cardData);

    // Act
    store.dispatch(action);

    // Assert
    let updatedState = store.getState();
    expect(updatedState.cards.data.length).toBe(1);
    expect(updatedState.cards.data[0]).toEqual(cardData);

    // Ignore duplicate
    store.dispatch(action);
    updatedState = store.getState();
    expect(updatedState.cards.data.length).toBe(1);
  });

  it('should delete a card', async () => {
    const cardData = { uuid: 'some-uuid', data: 'some-data' }; // provide appropriate card data for testing

    const store = setupStore({
      cards: { data: [cardData] },
    });

    let updatedState = store.getState();
    expect(updatedState.cards.data.length).toBe(1); // assert that the card data was inserted correctly
    const action = cardsSlice.actions.deleteCard(cardData.uuid);

    // Act
    store.dispatch(action);

    // Assert
    updatedState = store.getState();
    expect(updatedState.cards.data.length).toBe(0); // assert that the card data was inserted correctly
  });
});
