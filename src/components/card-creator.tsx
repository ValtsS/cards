import { CardData } from '../providers/card-provider';
import React, { FormEvent } from 'react';
import { CardErrors, CardValidator } from './card-validator';
import { InputWithDecorator } from './input-component';
import { SelectWithDecorator } from './select-component';
import { FormContextProvider } from '../providers/form-context-provider';
import Refs from './card-creator-refs';
import './card-creator.css';

export interface CardCreatorProps {
  onCardCreate?: (newCard: CardData) => void;
}

class LocalCardState {
  valid = false;
  card: CardData;
  errors: CardErrors;
  previewimageurl?: string;

  constructor(defaultDate: Date) {
    this.card = new CardData();
    this.card.addedat = defaultDate;
    this.errors = {};
  }
}

class CardCreator extends React.Component<CardCreatorProps, LocalCardState> {
  validator: CardValidator = new CardValidator();
  R: Refs = new Refs();

  constructor(props: CardCreatorProps) {
    super(props);
    this.state = new LocalCardState(new Date());
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImagePrview = this.handleImagePrview.bind(this);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Submit called');

    const c = this.validator.prepareCard(this.R);
    const isValid = this.validator.isValid(c);

    this.setState((prevState) => ({
      ...prevState,
      card: c,
      valid: isValid,
      errors: this.validator.errors,
      previewimageurl: isValid ? undefined : prevState.previewimageurl,
    }));

    console.log(c);

    if (isValid && this.props.onCardCreate) this.props.onCardCreate(c);
    if (isValid) this.R.reset();
  }

  handleImagePrview(event: FormEvent<HTMLInputElement>) {
    this.setState((prevState) => ({
      ...prevState,
      previewimageurl: this.R.formImageURL(false),
    }));
  }

  /*

  title?: string;
  imageUrl?: string;
  text?: string;
  price?: string;
  addedat?: Date;
  minipic?: string;
  rating?: number;
  flipimg?: boolean;
  grayscale?: boolean;


  */

  render() {
    const defaultDate = this.state.card.addedat?.toISOString().split('T')[0] ?? '';

    return (
      <>
        {this.state.valid.toString()}

        <FormContextProvider errors={this.state.errors}>
          <div className="flex-container">
            <div className="column">
              <form onSubmit={this.handleSubmit}>
                <InputWithDecorator name="title" title="Title" type="text" ref={this.R.refTitle} />

                <InputWithDecorator name="text" title="Text" type="text" ref={this.R.refText} />

                <InputWithDecorator
                  name="price"
                  title="Price"
                  type="number"
                  ref={this.R.refPrice}
                />

                <InputWithDecorator
                  name="addedat"
                  title="Added at"
                  type="date"
                  ref={this.R.refAdded}
                  defaultValue={defaultDate}
                />

                <SelectWithDecorator
                  name="rating"
                  title="Rating"
                  values={['', '1', '2', '3', '4', '5']}
                  ref={this.R.refSelect}
                />

                <InputWithDecorator
                  name="grayscale"
                  title="Grayscale picture"
                  type="checkbox"
                  ref={this.R.refGray}
                />

                <InputWithDecorator
                  name="bigimagemage"
                  title="Upload picture"
                  type="file"
                  ref={this.R.refImg}
                  onChange={this.handleImagePrview}
                />

                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="column bg-alt">
              {this.state.previewimageurl && (
                <>
                  <p>Image preview:</p>
                  <img className="preview" src={this.state.previewimageurl}></img>
                </>
              )}
            </div>
          </div>
        </FormContextProvider>
      </>
    );
  }
}

export default CardCreator;
