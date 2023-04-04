import { CardData, CardProviderStore } from './card-provider';

describe('Card provider', () => {
  it('should provide', () => {
    const prov = new CardProviderStore();
    expect(prov.data.length).toBe(0);
    const dummy = new CardData();
    prov.insert(dummy);
    expect(prov.data.length).toBe(1);
    prov.insert(dummy);
    expect(prov.data.length).toBe(1);
    prov.insert(new CardData());
    expect(prov.data.length).toBe(2);
  });

  it('should generate guids', () => {
    const card = new CardData();
    expect(card.uuid).toBe((CardData.counter - 1).toString());
    expect(new CardData().uuid).not.toBe(card.uuid);
  });
});
