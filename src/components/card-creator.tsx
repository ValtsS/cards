import { CardData } from '../providers/card-provider';
import React, { FormEvent } from 'react';
import { CardErrors, CardValidator } from './card-validator';
import { InputWithDecorator } from './input-component';
import { SelectWithDecorator } from './select-component';
import { FormContextProvider } from '../providers/form-context-provider';
import Refs from './card-creator-refs';

export interface CardCreatorProps {
  onCardCreate?: (newCard: CardData) => void;
}

class LocalCardState {
  valid = false;
  card: CardData;
  errors: CardErrors;

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
    }));

    console.log(c);

    if (isValid && this.props.onCardCreate) this.props.onCardCreate(c);
    if (isValid) this.R.reset();
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
  rawImage?: File;

  */

  render() {
    const defaultDate = this.state.card.addedat?.toISOString().split('T')[0] ?? '';

    return (
      <>
        {this.state.valid.toString()}

        <FormContextProvider errors={this.state.errors}>
          <form onSubmit={this.handleSubmit}>
            <InputWithDecorator name="title" title="Title" type="text" ref={this.R.refTitle} />

            <InputWithDecorator name="text" title="Text" type="text" ref={this.R.refText} />

            <InputWithDecorator name="price" title="Price" type="number" ref={this.R.refPrice} />

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
              name="rawImage"
              title="Upload picture"
              type="file"
              ref={this.R.refImg}
            />

            {this.state.card.imageUrl && <img src={this.state.card.imageUrl}></img>}

            <button type="submit">Submit</button>
          </form>
        </FormContextProvider>
      </>
    );
  }
}

export default CardCreator;
