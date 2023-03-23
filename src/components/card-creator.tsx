import { CardData } from '../providers/card-provider';
import React, { createRef, FormEvent } from 'react';
import { CardValidator } from './card-validator';
import { InputWithDecorator } from './input-component';
import { SelectWithDecorator } from './select-component';

export interface CardCreatorProps {}

class LocalCardState {
  valid: boolean = false;
  card: CardData;

  constructor(defaultDate: Date) {
    this.card = new CardData();
    this.card.addedat = defaultDate;
  }
}

class CardCreator extends React.Component<CardCreatorProps, LocalCardState> {

  validator: CardValidator;

  refTitle: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refText: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refPrice: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refAdded: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  refSelect: React.RefObject<HTMLSelectElement> = createRef<HTMLSelectElement>();

  constructor(props: CardCreatorProps) {
    super(props);
    this.state = new LocalCardState(new Date());
    this.validator = new CardValidator();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Submit called');



    const parsed = Date.parse(this.refAdded.current?.value ?? '');

    const c = new CardData();
    c.title = this.refTitle.current?.value;
    c.text = this.refText.current?.value;
    c.price = this.refPrice.current?.value;
    c.addedat = (isNaN(parsed) === false) ? new Date(parsed) : undefined;
    c.rating = +(this.refSelect.current?.value ?? 0);

    console.log(this.refSelect.current?.value)

    this.setState(prevState => ({
      ...prevState,
      card: c,
      valid: this.validator.isValid(c)
    }));

    console.log(c);


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

        <form onSubmit={this.handleSubmit}>
          <InputWithDecorator
            name="title"
            title="Title"
            type="text"
            ref={this.refTitle}
          />

          <InputWithDecorator
            name="text"
            title="Text"
            type="text"
            ref={this.refText}
          />

          <InputWithDecorator
            name="price"
            title="Price"
            type="number"
            ref={this.refPrice}
          />

          <InputWithDecorator
            name="addedat"
            title="Added at"
            type="date"
            ref={this.refAdded}
            defaultValue={defaultDate}
          />

          <SelectWithDecorator
            name='rating'
            title='Rating'
            values={['1','2','3','4','5']}
           />


          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

export default CardCreator;
