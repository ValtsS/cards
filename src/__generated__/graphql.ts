/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  uuid: Scalars['String'];
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

export type GetCardsQueryVariables = Exact<{
  filter: CardFilterInput;
  order?: InputMaybe<Array<CardSortInput> | CardSortInput>;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;

export type GetCardsQuery = {
  __typename?: 'Query';
  getCards?: {
    __typename?: 'GetCardsCollectionSegment';
    totalCount: number;
    pageInfo: {
      __typename?: 'CollectionSegmentInfo';
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    items?: Array<{
      __typename?: 'Card';
      uuid: string;
      imageUrl: string;
      flipimg: boolean;
      grayscale: boolean;
    }> | null;
  } | null;
};

export type GetCardQueryVariables = Exact<{
  filter: CardFilterInput;
}>;

export type GetCardQuery = {
  __typename?: 'Query';
  getCards?: {
    __typename?: 'GetCardsCollectionSegment';
    totalCount: number;
    items?: Array<{
      __typename?: 'Card';
      uuid: string;
      title: string;
      text: string;
      imageUrl: string;
      minipic: string;
      price: string;
      addedat?: any | null;
      rating?: number | null;
      flipimg: boolean;
      grayscale: boolean;
    }> | null;
  } | null;
};

export const GetCardsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getCards' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CardFilterInput' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'CardSortInput' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getCards' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'order' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'flipimg' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'grayscale' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCardsQuery, GetCardsQueryVariables>;
export const GetCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getCard' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CardFilterInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getCards' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: { kind: 'IntValue', value: '0' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: { kind: 'IntValue', value: '1' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'minipic' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'addedat' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rating' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'flipimg' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'grayscale' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCardQuery, GetCardQueryVariables>;
