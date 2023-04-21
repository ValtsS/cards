import { InputDecorator, RadioWithDecorator, SelectWithDecorator } from '@/components/input';
import ImageCache from '@/core/ImageCache';
import { CardData } from '@/providers';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import './card-creator.css';
import { CardFormValues, CardValidator } from './card-validator';

export interface CardCreatorProps {
  onCardCreate?: (newCard: CardData) => void;
}

class LocalState {
  previewImageUrl?: string;
}

export const CardCreator = (props: CardCreatorProps): ReactElement => {
  const validator = new CardValidator();
  const radioNames: string[] = [
    CardValidator.IMAGE_ORIENTATION.NORMAL,
    CardValidator.IMAGE_ORIENTATION.FLIPPED,
  ];

  const [state, setState] = useState(new LocalState());

  const handleImagePrview = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    let url: string | undefined = undefined;

    if (fileList && validator.onImageValidate(fileList) === true)
      url = ImageCache.formImageURL(false, fileList[0]);

    setState((prevState) => ({
      ...prevState,
      previewImageUrl: url,
    }));
  };

  const methods = useForm<CardFormValues>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  const register = methods.register;

  const onSubmit = (data: CardFormValues) => {
    const c = validator.prepareCard(data);
    const isValid = validator.isValid(c);

    if (!isValid) throw Error('Invalid data passed, should be cleaned in prevalidation. ');

    setState((prevState) => ({
      ...prevState,
      card: c,
      previewImageUrl: isValid ? undefined : prevState.previewImageUrl,
    }));

    if (isValid && props.onCardCreate) props.onCardCreate(c);
    if (isValid) methods.reset();
  };

  return (
    <>
      <div className="flex-container">
        <div className="column">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <InputDecorator title="Title" name="title">
                <input
                  {...register('title', {
                    required: { value: true, message: CardValidator.ERRORS.TITLE_REQUIRED },
                  })}
                  type="text"
                />
              </InputDecorator>
              <InputDecorator title="Text" name="text">
                <input
                  {...register('text', {
                    required: { value: true, message: CardValidator.ERRORS.TEXT_REQUIRED },
                  })}
                  type="text"
                />
              </InputDecorator>
              <InputDecorator title="Price" name="price">
                <input
                  {...register('price', {
                    validate: validator.onPriceValidate,
                  })}
                  type="number"
                  step=".01"
                />
              </InputDecorator>

              <InputDecorator title="Added at" name="addedat">
                <input
                  {...register('addedat', {
                    validate: validator.onDateValidate,
                  })}
                  type="date"
                />
              </InputDecorator>

              <SelectWithDecorator
                name="rating"
                title="Rating"
                values={['', '1', '2', '3', '4', '5']}
                validator={validator.onRatingValidate}
              />

              <InputDecorator title="Grayscale picture" name="grayscale">
                <input
                  {...register('grayscale', {
                    required: { value: true, message: CardValidator.ERRORS.GRAYSCALE_REQUIRED },
                  })}
                  type="checkbox"
                />
              </InputDecorator>

              <InputDecorator title="Upload picture" name="bigimagemage">
                <input
                  {...register('bigimagemage', {
                    validate: validator.onImageValidate,
                  })}
                  type="file"
                  accept={'image/*'}
                  onInput={handleImagePrview}
                />
              </InputDecorator>

              <RadioWithDecorator
                name="radioflip"
                title="Image orientation"
                values={radioNames}
                validator={validator.onFlipValidate}
              />

              <input type="submit" />
            </form>
          </FormProvider>
        </div>
        <div className="column bg-alt">
          {state.previewImageUrl && (
            <>
              <p>Image preview:</p>
              <img className="preview" src={state.previewImageUrl}></img>
            </>
          )}
        </div>
      </div>
    </>
  );
};
