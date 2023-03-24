import { CardProviderStore } from './card-provider';

describe('Card provider', () => {
  it('should provide', () => {
    const prov = new CardProviderStore();
    expect(prov.data).toBeUndefined();

    prov.loadTestData('').then((data) => expect(data.length).toBeGreaterThan(0));

    prov.loadTestData('!@#@%@@#%@#%@#^@').then((data) => expect(data.length).toEqual(0));
  });
});
