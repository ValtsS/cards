import { CardData, FormContextProvider } from '@/providers';
import React, { FormEvent, ReactElement, useState } from 'react';
import { CardErrors, CardValidator } from './card-validator';
import { InputWithDecorator, RadioWithDecorator, SelectWithDecorator } from '@/components/input';
import Refs from './card-creator-refs';
import './card-creator.css';

export interface CardCreatorProps {
  onCardCreate?: (newCard: CardData) => void;
}

class LocalCardState {
  valid = false;
  card: CardData;
  errors: CardErrors;
  previewImageUrl?: string;

  constructor(defaultDate: Date) {
    this.card = new CardData();
    this.card.addedat = defaultDate;
    this.errors = {};
    this.valid = false;
  }
}

export const CardCreator = (props: CardCreatorProps): ReactElement => {
  const validator = new CardValidator();
  const radioNames: string[] = ['Normal', 'Flipped'];
  const references: Refs = new Refs(radioNames);

  const [state, setState] = useState(new LocalCardState(new Date()));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const c = validator.prepareCard(references);
    const isValid = validator.isValid(c);

    setState((prevState) => ({
      ...prevState,
      card: c,
      valid: isValid,
      errors: validator.errors,
      previewImageUrl: isValid ? undefined : prevState.previewImageUrl,
    }));

    if (isValid && props.onCardCreate) props.onCardCreate(c);
    if (isValid) references.reset();
  };

  const handleImagePrview = () => {
    setState((prevState) => ({
      ...prevState,
      previewImageUrl: references.formImageURL(false),
    }));
  };

  return (
    <>
      <FormContextProvider errors={state.errors}>
        <div className="flex-container">
          <div className="column">
            <form onSubmit={handleSubmit} ref={references.refForm}>
              <InputWithDecorator
                name="title"
                title="Title"
                type="text"
                ref={references.refTitle}
              />

              <InputWithDecorator name="text" title="Text" type="text" ref={references.refText} />

              <InputWithDecorator
                name="price"
                title="Price"
                type="number"
                ref={references.refPrice}
              />

              <InputWithDecorator
                name="addedat"
                title="Added at"
                type="date"
                ref={references.refAdded}
              />

              <SelectWithDecorator
                name="rating"
                title="Rating"
                values={['', '1', '2', '3', '4', '5']}
                ref={references.refSelect}
              />

              <InputWithDecorator
                name="grayscale"
                title="Grayscale picture"
                type="checkbox"
                ref={references.refGray}
              />

              <InputWithDecorator
                name="bigimagemage"
                title="Upload picture"
                type="file"
                ref={references.refImg}
                onChange={handleImagePrview}
                accept={'image/*'}
              />

              <RadioWithDecorator
                name="radioflip"
                title="Image orientation"
                values={radioNames}
                forwardedRefs={references.refRadios.refs}
              />

              <button type="submit">Submit</button>
            </form>
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
      </FormContextProvider>
    </>
  );
};
