import { render } from '@testing-library/react';
import { CardData } from 'providers/card-provider';
import React from 'react';
import Refs from './card-creator-refs';
import { CardValidator } from './card-validator';

describe('CardValidator', () => {
  let validator: CardValidator;

  beforeEach(() => {
    validator = new CardValidator();
  });

  describe('isValid', () => {
    it('returns true for a valid card', () => {
      const card = new CardData();
      card.title = 'Test Title';
      card.text = 'Test Text';
      card.price = '100';
      card.addedat = new Date();
      card.rating = 3;
      card.imageUrl = 'http://example.com/image.png';
      card.flipimg = false;
      expect(validator.isValid(card)).toBe(true);
      expect(validator.errors).toEqual({});
    });

    it('returns false and sets errors for an invalid card', () => {
      const card = new CardData();
      expect(validator.isValid(card)).toBe(false);
      expect(validator.errors).toEqual({
        title: 'Title is required',
        text: 'Text is required',
        price: 'Price is required',
        addedat: 'Added at is required',
        rating: 'At least one star rating is required',
        bigimagemage: 'please provide a pretty picture',
        radioflip: 'Need to pick orientation',
      });
    });

    it('returns false and sets errors for an invalid card data', () => {
      const card = new CardData();
      card.title = 'Test Title';
      card.text = 'Test Text';
      card.price = '-100';
      card.addedat = new Date(new Date().getFullYear() + 100, 1, 1);
      card.rating = 3;
      card.imageUrl = 'http://example.com/image.png';
      card.flipimg = false;
      expect(validator.isValid(card)).toBe(false);
      expect(validator.errors).toEqual({
        addedat: 'Added at cannot be in the future!',
        price: 'Price has to be valid (positive)',
      });
    });
  });

  const renderMode = (refs: Refs, mode: number) => {
    render(
      <>
        <input type="text" ref={refs.refTitle} defaultValue="Test Title" />
        <input type="text" ref={refs.refText} defaultValue="Test Text" />
        <input type="number" ref={refs.refPrice} defaultValue={100} />
        <input type="date" ref={refs.refAdded} defaultValue="2023-01-13" />
        <select ref={refs.refSelect} defaultValue={mode == -2 ? '' : '3'}>
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <input type="checkbox" ref={refs.refGray} defaultChecked={true} />
        <input
          type="radio"
          name="flipimg"
          ref={refs.refRadios.refs[0]}
          value="0"
          defaultChecked={mode === 0 ? true : undefined}
        />
        <input
          type="radio"
          name="flipimg"
          ref={refs.refRadios.refs[1]}
          value="1"
          defaultChecked={mode === 1 ? true : undefined}
        />
      </>
    );
  };

  describe('prepareCard', () => {
    it('returns the correct card data', () => {
      const refs = new Refs(['radio1', 'radio2']);

      renderMode(refs, 0);

      const card = validator.prepareCard(refs);
      expect(card.title).toBe('Test Title');
      expect(card.text).toBe('Test Text');
      expect(card.price).toBe('100');
      expect(card.addedat).toEqual(new Date('2023-01-13'));
      expect(card.rating).toBe(3);
      expect(card.grayscale).toBe(true);
      expect(card.flipimg).toBe(false);
    });
  });

  describe('prepareCard', () => {
    it('returns the filpimage', () => {
      const refs = new Refs(['radio1', 'radio2']);

      renderMode(refs, 1);

      const card = validator.prepareCard(refs);
      expect(card.title).toBe('Test Title');
      expect(card.text).toBe('Test Text');
      expect(card.price).toBe('100');
      expect(card.addedat).toEqual(new Date('2023-01-13'));
      expect(card.rating).toBe(3);
      expect(card.grayscale).toBe(true);
      expect(card.flipimg).toBe(true);
    });
  });

  it('returns the filpimage missing', () => {
    const refs = new Refs(['radio1', 'radio2']);

    renderMode(refs, -1);

    const card = validator.prepareCard(refs);
    expect(card.title).toBe('Test Title');
    expect(card.text).toBe('Test Text');
    expect(card.price).toBe('100');
    expect(card.addedat).toEqual(new Date('2023-01-13'));
    expect(card.rating).toBe(3);
    expect(card.grayscale).toBe(true);
    expect(card.flipimg).toBe(undefined);
  });

  it('returns the missing rating', () => {
    const refs = new Refs(['radio1', 'radio2']);

    renderMode(refs, -2);

    const card = validator.prepareCard(refs);
    expect(card.title).toBe('Test Title');
    expect(card.text).toBe('Test Text');
    expect(card.price).toBe('100');
    expect(card.addedat).toEqual(new Date('2023-01-13'));
    expect(card.rating).toBe(0);
    expect(card.grayscale).toBe(true);
    expect(card.flipimg).toBe(undefined);
  });

  it('check if reset works', () => {
    const refs = new Refs(['radio1', 'radio2']);

    renderMode(refs, 0);
    refs.reset();

    const card = validator.prepareCard(refs);
    expect(card.title).toBe('');
    expect(card.text).toBe('');
    expect(card.price).toBe('');
    expect(card.addedat).toBeUndefined();
    expect(card.rating).toBe(0);
    expect(card.grayscale).toBe(false);
    expect(card.flipimg).toBeUndefined();

    expect(validator.isValid(card)).toBe(false);
    expect(validator.errors).toEqual({
      title: 'Title is required',
      text: 'Text is required',
      price: 'Price is required',
      addedat: 'Added at is required',
      rating: 'At least one star rating is required',
      bigimagemage: 'please provide a pretty picture',
      radioflip: 'Need to pick orientation',
    });
  });
});
