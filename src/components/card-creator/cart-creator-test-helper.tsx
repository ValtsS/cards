import { CardData } from '@/providers';
import { act, fireEvent, screen } from '@testing-library/react';

export const fillTheInputs = async (data: CardData, file: File) => {
  const input = screen.getByLabelText('Upload picture') as HTMLInputElement;
  expect(input).toBeInTheDocument();

  await act(async () => {
    fireEvent.input(input, { target: { files: [file] } });
    fireEvent.change(input, { target: { files: [file] } });
  });

  expect(input.files?.[0]).toBe(file);

  const texts = screen.queryAllByRole('textbox');
  expect(screen.queryAllByRole('textbox').length).toBe(2);
  fireEvent.change(texts[0], { target: { value: data.title } });
  fireEvent.change(texts[1], { target: { value: data.text } });

  const ratingcontrol = screen.getByRole('combobox');
  fireEvent.change(ratingcontrol, { target: { value: data.rating } });

  const gray = screen.getByRole('checkbox');
  fireEvent.click(gray);

  const pricecontrol = screen.getByRole('spinbutton');
  fireEvent.change(pricecontrol, { target: { value: data.price } });

  const orientation = screen.queryAllByRole('radio');
  expect(orientation.length).toBe(2);
  const firstRadio = orientation[data.flipimg ? 1 : 0];
  fireEvent.click(firstRadio);

  const dateadd = screen.getByLabelText('Added at');
  expect(dateadd).toBeInTheDocument();

  if (data.addedat) {
    const dateToTest = new Date(data.addedat ?? 0).toISOString().split('T')[0];
    fireEvent.change(dateadd, { target: { value: dateToTest } });
  }
};

export const expectedTestCardData: CardData = {
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
