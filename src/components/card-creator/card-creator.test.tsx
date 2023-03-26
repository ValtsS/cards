import { CardData } from '@/providers';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { CardValidator } from './card-validator';
import { CardCreator } from './card-creator';

describe('Card Shell component', () => {
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

  it('should Trigger all the validation errors', () => {
    render(<CardCreator />);

    const sumbit = screen.getByRole('button');

    fireEvent.click(sumbit);

    screen.getByText(CardValidator.ERRORS.ORIENTATION_REQUIRED);
    screen.getByText(CardValidator.ERRORS.IMAGE_REQUIRED);
    screen.getByText(CardValidator.ERRORS.ORIENTATION_REQUIRED);
    screen.getByText(CardValidator.ERRORS.PRICE_REQUIRED);
    screen.getByText(CardValidator.ERRORS.RATING_REQUIRED);
    screen.getByText(CardValidator.ERRORS.TEXT_REQUIRED);
    screen.getByText(CardValidator.ERRORS.TITLE_REQUIRED);
  });

  it('should handle creation', () => {
    const fn = jest.fn();

    const mockCreateObjectURL = jest.fn(() => 'mock-url');
    global.URL.createObjectURL = mockCreateObjectURL;

    render(<CardCreator onCardCreate={fn} />);

    const file = new File(['test image'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('Upload picture') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files?.[0]).toBe(file);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'mock-url');

    const texts = screen.queryAllByRole('textbox');
    expect(screen.queryAllByRole('textbox').length).toBe(2);
    fireEvent.change(texts[0], { target: { value: 'Text1' } });
    fireEvent.change(texts[1], { target: { value: 'Text2' } });

    const ratingcontrol = screen.getByRole('combobox');
    fireEvent.change(ratingcontrol, { target: { value: '1' } });

    const gray = screen.getByRole('checkbox');
    fireEvent.click(gray);

    const pricecontrol = screen.getByRole('spinbutton');
    fireEvent.change(pricecontrol, { target: { value: '13' } });

    const orientation = screen.queryAllByRole('radio');
    expect(orientation.length).toBe(2);
    const firstRadio = orientation[0];
    fireEvent.click(firstRadio);

    const dateadd = screen.getByLabelText('Added at');
    expect(dateadd).toBeInTheDocument();
    fireEvent.change(dateadd, { target: { value: '2012-12-15' } });

    const sumbit = screen.getByRole('button');
    fireEvent.click(sumbit);

    expect(fn).toBeCalledTimes(1);

    const expected: CardData = {
      addedat: new Date('2012-12-15'),
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

    expect(receivedDate.getTime()).toEqual(new Date('2012-12-15').getTime());
  });
});
