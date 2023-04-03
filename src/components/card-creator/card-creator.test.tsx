import { CardData } from '@/providers';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { CardCreator } from './card-creator';
import { CardValidator } from './card-validator';

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

    // wait for the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    screen.getByText(CardValidator.ERRORS.ORIENTATION_REQUIRED);
    screen.getByText(CardValidator.ERRORS.IMAGE_REQUIRED);
    screen.getByText(CardValidator.ERRORS.ORIENTATION_REQUIRED);
    screen.getByText(CardValidator.ERRORS.PRICE_REQUIRED);
    screen.getByText(CardValidator.ERRORS.RATING_REQUIRED);
    screen.getByText(CardValidator.ERRORS.TEXT_REQUIRED);
    screen.getByText(CardValidator.ERRORS.TITLE_REQUIRED);
  });

  it('should handle creation', async () => {
    const fn = jest.fn();

    const mockCreateObjectURL = jest.fn(() => 'mock-url');
    global.URL.createObjectURL = mockCreateObjectURL;

    render(<CardCreator onCardCreate={fn} />);

    const file = new File(['test image'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('Upload picture') as HTMLInputElement;

    expect(input).toBeInTheDocument();

    await act(async () => {
      fireEvent.input(input, { target: { files: [file] } });
      fireEvent.change(input, { target: { files: [file] } });
    });

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
    const dateToTest = '2012-12-15';
    fireEvent.change(dateadd, { target: { value: dateToTest } });

    const submit = screen.getByRole('button');

    // wait for the component to re-render
    await act(async () => {
      fireEvent.mouseDown(submit);
      fireEvent.click(submit);
      fireEvent.mouseUp(submit);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(fn).toBeCalledTimes(1);

    const expected: CardData = {
      addedat: new Date(dateToTest),
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

    expect(receivedDate.getTime()).toEqual(new Date(dateToTest).getTime());
  });
});
