import { CardData } from '@/providers';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { CardCreator } from './card-creator';
import { CardValidator } from './card-validator';
import { fillTheInputs } from './cart-creator-test-helper';
import { waitRender } from '@/../__mocks__/test-utils';

describe('Card Shell component', () => {
  let originalCreate: (obj: Blob | MediaSource) => string;

  beforeEach(() => {
    originalCreate = global.URL.createObjectURL;
  });

  afterEach(() => {
    global.URL.createObjectURL = originalCreate;
  });

  it('should not crash', () => {
    render(<CardCreator />);
    expect(screen.queryAllByRole('textbox').length).toBe(2);
    expect(screen.queryAllByRole('combobox').length).toBe(1);
    expect(screen.queryAllByRole('option').length).toBe(6); // 5 stars + default
    expect(screen.queryAllByRole('radio').length).toBe(2);
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should Trigger all the validation errors', async () => {
    render(<CardCreator />);

    const submit = screen.getByRole('button');

    expect(submit).toBeInTheDocument();

    act(() => {
      fireEvent.mouseDown(submit);
      fireEvent.click(submit);
      fireEvent.mouseUp(submit);
    });

    await waitRender();

    screen.getByText(CardValidator.ERRORS.ORIENTATION_REQUIRED);
    screen.getByText(CardValidator.ERRORS.IMAGE_REQUIRED);
    screen.getByText(CardValidator.ERRORS.ORIENTATION_REQUIRED);
    screen.getByText(CardValidator.ERRORS.PRICE_REQUIRED);
    screen.getByText(CardValidator.ERRORS.RATING_REQUIRED);
    screen.getByText(CardValidator.ERRORS.TEXT_REQUIRED);
    screen.getByText(CardValidator.ERRORS.TITLE_REQUIRED);
  });

  it('should handle creation', async () => {
    const mockCreateObjectURL = jest.fn(() => 'mock-url');
    const original = global.URL.createObjectURL;
    try {
      global.URL.createObjectURL = mockCreateObjectURL;

      const file = new File(['test image'], 'test.png', { type: 'image/png' });

      const fn = jest.fn();

      render(<CardCreator onCardCreate={fn} />);

      const expected: CardData = {
        addedat: new Date('2012-01-01').getTime(),
        flipimg: false,
        grayscale: true,
        imageUrl: 'mock-url',
        minipic: undefined,
        price: '13',
        rating: 1,
        text: 'Text2',
        title: 'Text1',
        uuid: '4',
      };

      await fillTheInputs(expected, file);
      expect(screen.getByRole('img')).toHaveAttribute('src', 'mock-url');

      const submit = screen.getByRole('button');

      expect(submit).toBeInTheDocument();

      // wait for the component to re-render
      await act(async () => {
        fireEvent.mouseDown(submit);
        fireEvent.click(submit);
        fireEvent.mouseUp(submit);
      });

      await waitRender();

      expect(fn).toBeCalledTimes(1);
      const actual: CardData = fn.mock.calls[0][0];

      expect(actual.flipimg).toEqual(expected.flipimg);
      expect(actual.grayscale).toEqual(expected.grayscale);
      expect(actual.imageUrl).toEqual(expected.imageUrl);
      expect(actual.minipic).toEqual(expected.minipic);
      expect(actual.price).toEqual(expected.price);
      expect(actual.rating).toEqual(expected.rating);
      expect(actual.text).toEqual(expected.text);
      expect(actual.title).toEqual(expected.title);

      const receivedDate = new Date(actual.addedat ?? 0);

      expect(receivedDate.getTime()).toEqual(new Date(expected.addedat ?? 0).getTime());
    } finally {
      global.URL.createObjectURL = original;
    }
  });
});
