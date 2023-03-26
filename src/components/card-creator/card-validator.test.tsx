import { CardData } from '@/providers';
import { act, render, screen, waitFor } from '@testing-library/react';
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
        title: CardValidator.ERRORS.TITLE_REQUIRED,
        text: CardValidator.ERRORS.TEXT_REQUIRED,
        price: CardValidator.ERRORS.PRICE_REQUIRED,
        addedat: CardValidator.ERRORS.ADDED_AT_REQUIRED,
        rating: CardValidator.ERRORS.RATING_REQUIRED,
        bigimagemage: CardValidator.ERRORS.IMAGE_REQUIRED,
        radioflip: CardValidator.ERRORS.ORIENTATION_REQUIRED,
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
        addedat: CardValidator.ERRORS.ADDED_AT_FUTURE,
        price: CardValidator.ERRORS.PRICE_VALID,
      });
    });
  });

  const renderMode = (refs: Refs, mode: number) => {
    render(
      <form ref={refs.refForm}>
        <input type="text" ref={refs.refTitle} defaultValue="Test Title" />
        <input type="text" ref={refs.refText} defaultValue="Test Text" />
        <input type="number" ref={refs.refPrice} defaultValue={100} />
        {mode != -7 && <input type="date" ref={refs.refAdded} defaultValue="2023-01-13" />}
        {mode != -8 && (
          <select ref={refs.refSelect} defaultValue={mode == -2 ? '' : '3'}>
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        )}
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
      </form>
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

  it('returns the missing date', () => {
    const refs = new Refs(['radio1', 'radio2']);

    renderMode(refs, -7);

    const card = validator.prepareCard(refs);
    expect(card.title).toBe('Test Title');
    expect(card.text).toBe('Test Text');
    expect(card.price).toBe('100');
    expect(card.addedat).toBeUndefined();
    expect(card.rating).toBe(3);
    expect(card.grayscale).toBe(true);
    expect(card.flipimg).toBe(undefined);
  });

  it('returns the rating not defined', () => {
    const refs = new Refs(['radio1', 'radio2']);

    renderMode(refs, -8);

    const card = validator.prepareCard(refs);
    expect(card.title).toBe('Test Title');
    expect(card.text).toBe('Test Text');
    expect(card.price).toBe('100');
    expect(card.addedat).toEqual(new Date('2023-01-13'));
    expect(card.rating).toBe(0);
    expect(card.grayscale).toBe(true);
    expect(card.flipimg).toBe(undefined);
  });

  it('check if reset works', async () => {
    const refs = new Refs(['radio1', 'radio2']);
    console.log('ref-reset-test');
    act(() => {
      renderMode(refs, 0);
    });
    // Working around the fact that DOM is not fully rendered yet
    setTimeout(() => {
      refs.reset();

      const card = validator.prepareCard(refs);
      expect(card.title).toBe('');
      console.log(card);

      expect(card.title).toBe('');
      expect(card.text).toBe('');
      expect(card.price).toBe('');
      expect(card.addedat).toBeUndefined();
      expect(card.rating).toBe(0);
      expect(card.grayscale).toBe(false);
      expect(card.flipimg).toBeUndefined();

      expect(validator.isValid(card)).toBe(false);
      expect(validator.errors).toEqual({
        title: CardValidator.ERRORS.TITLE_REQUIRED,
        text: CardValidator.ERRORS.TEXT_REQUIRED,
        price: CardValidator.ERRORS.PRICE_REQUIRED,
        addedat: CardValidator.ERRORS.ADDED_AT_REQUIRED,
        rating: CardValidator.ERRORS.RATING_REQUIRED,
        bigimagemage: CardValidator.ERRORS.IMAGE_REQUIRED,
        radioflip: CardValidator.ERRORS.ORIENTATION_REQUIRED,
      });
    }, 0);
  });
});
