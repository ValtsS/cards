import { CardData, FormContextProvider } from '@/providers';
import React, { FormEvent } from 'react';
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

export class CardCreator extends React.Component<CardCreatorProps, LocalCardState> {
  validator: CardValidator = new CardValidator();

  radioNames: string[] = ['Normal', 'Flipped'];
  references: Refs = new Refs(this.radioNames);

  constructor(props: CardCreatorProps) {
    super(props);
    this.state = new LocalCardState(new Date());
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const c = this.validator.prepareCard(this.references);
    const isValid = this.validator.isValid(c);

    this.setState((prevState) => ({
      ...prevState,
      card: c,
      valid: isValid,
      errors: this.validator.errors,
      previewImageUrl: isValid ? undefined : prevState.previewImageUrl,
    }));

    if (isValid && this.props.onCardCreate) this.props.onCardCreate(c);
    if (isValid) this.references.reset();
  };

  handleImagePrview = () => {
    this.setState((prevState) => ({
      ...prevState,
      previewImageUrl: this.references.formImageURL(false),
    }));
  };

  render() {
    const defaultDate = this.state.card.addedat?.toISOString().split('T')[0];

    return (
      <>
        <FormContextProvider errors={this.state.errors}>
          <div className="flex-container">
            <div className="column">
              <form onSubmit={this.handleSubmit} ref={this.references.refForm}>
                <InputWithDecorator
                  name="title"
                  title="Title"
                  type="text"
                  ref={this.references.refTitle}
                />

                <InputWithDecorator
                  name="text"
                  title="Text"
                  type="text"
                  ref={this.references.refText}
                />

                <InputWithDecorator
                  name="price"
                  title="Price"
                  type="number"
                  ref={this.references.refPrice}
                />

                <InputWithDecorator
                  name="addedat"
                  title="Added at"
                  type="date"
                  ref={this.references.refAdded}
                />

                <SelectWithDecorator
                  name="rating"
                  title="Rating"
                  values={['', '1', '2', '3', '4', '5']}
                  ref={this.references.refSelect}
                />

                <InputWithDecorator
                  name="grayscale"
                  title="Grayscale picture"
                  type="checkbox"
                  ref={this.references.refGray}
                />

                <InputWithDecorator
                  name="bigimagemage"
                  title="Upload picture"
                  type="file"
                  ref={this.references.refImg}
                  onChange={this.handleImagePrview}
                  accept={'image/*'}
                />

                <RadioWithDecorator
                  name="radioflip"
                  title="Image orientation"
                  values={this.radioNames}
                  forwardedRefs={this.references.refRadios.refs}
                />

                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="column bg-alt">
              {this.state.previewImageUrl && (
                <>
                  <p>Image preview:</p>
                  <img className="preview" src={this.state.previewImageUrl}></img>
                </>
              )}
            </div>
          </div>
        </FormContextProvider>
      </>
    );
  }
}
