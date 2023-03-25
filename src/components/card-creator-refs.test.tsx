import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Refs, { RadioInfos } from './card-creator-refs';
import { InputWithDecorator } from './input-component';

describe('Card creator refs', () => {
  it('should not crash', () => {
    const refs = new Refs(['Radio']);

    expect(refs.refAdded).toBeTruthy();
    expect(refs.refGray).toBeTruthy();
    expect(refs.refImg).toBeTruthy();
    expect(refs.refPrice).toBeTruthy();
    expect(refs.refSelect).toBeTruthy();
    expect(refs.refText).toBeTruthy();
    expect(refs.refTitle).toBeTruthy();
    expect(refs.refRadios).toBeTruthy();

    expect(refs.refRadios).toBeInstanceOf(RadioInfos);
  });

  it('should reset with no crash', () => {
    const refs = new Refs(['Radio']);
    refs.reset();
  });

  it('should not create iamges', () => {
    const refs = new Refs(['Radio']);

    const props = {
      name: 'test-input',
      title: 'Upload picture',
      type: 'file',
      accept: '.jpg,.png,.gif',
      placeholder: 'Enter a value',
      onChange: jest.fn(),
      ref: refs.refImg,
    };

    render(<InputWithDecorator {...props} />);

    expect(refs.formImageURL(true)).toBe(undefined);
  });

  it('should create images', () => {
    const mockCreateObjectURL = jest.fn(() => 'mock-url');
    global.URL.createObjectURL = mockCreateObjectURL;

    const mockrevokeObjectURL = jest.fn();
    global.URL.revokeObjectURL = mockrevokeObjectURL;

    const refs = new Refs(['Radio']);

    const props = {
      name: 'test-input',
      title: 'Upload picture',
      type: 'file',
      accept: '.jpg,.png,.gif',
      placeholder: 'Enter a value',
      onChange: jest.fn(),
      ref: refs.refImg,
    };

    render(<InputWithDecorator {...props} />);

    expect(refs.oldimages.isEmpty()).toBe(true);
    expect(mockCreateObjectURL).toBeCalledTimes(0);
    expect(mockrevokeObjectURL).toBeCalledTimes(0);

    const file = new File(['test image'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('Upload picture') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files?.[0]).toBe(file);

    expect(refs.formImageURL(true)).toBe('mock-url');
    expect(refs.oldimages.isEmpty()).toBe(true);
    expect(mockCreateObjectURL).toBeCalledTimes(1);
    expect(mockrevokeObjectURL).toBeCalledTimes(0);

    for (let i = 0; i <= Refs.CACHED_IMAGES + 1; i++) {
      expect(refs.formImageURL(false)).toBe('mock-url');

      expect(mockCreateObjectURL).toBeCalledTimes(2 + i);

      if (i < Refs.CACHED_IMAGES) {
        expect(refs.oldimages.size()).toBe(1 + i);
        expect(mockrevokeObjectURL).toBeCalledTimes(0);
      } else {
        expect(refs.oldimages.size()).toBe(Refs.CACHED_IMAGES);
        expect(mockrevokeObjectURL).toBeCalledTimes(i - Refs.CACHED_IMAGES + 1);
      }
    }
  });
});
