/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
};

export type Card = {
  __typename?: 'Card';
  addedat?: Maybe<Scalars['DateTime']>;
  flipimg: Scalars['Boolean'];
  grayscale: Scalars['Boolean'];
  imageUrl: Scalars['String'];
  matches: Scalars['Boolean'];
  minipic: Scalars['String'];
  price: Scalars['String'];
  rating?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  title: Scalars['String'];
  uuid: Scalars['String'];
};

export type CardMatchesArgs = {
  query: Scalars['String'];
};

export type CardFilterInput = {
  searchQuery: Scalars['String'];
};

export type CardSortInput = {
  addedat?: InputMaybe<SortEnumType>;
  flipimg?: InputMaybe<SortEnumType>;
  grayscale?: InputMaybe<SortEnumType>;
  imageUrl?: InputMaybe<SortEnumType>;
  minipic?: InputMaybe<SortEnumType>;
  price?: InputMaybe<SortEnumType>;
  rating?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  uuid?: InputMaybe<SortEnumType>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
};

/** A segment of a collection. */
export type GetCardsCollectionSegment = {
  __typename?: 'GetCardsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Card>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getCards?: Maybe<GetCardsCollectionSegment>;
};

export type QueryGetCardsArgs = {
  filter: CardFilterInput;
  order?: InputMaybe<Array<CardSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC',
}
