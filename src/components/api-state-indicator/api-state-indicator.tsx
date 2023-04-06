import { ProviderState } from '@/providers/card/api-provider';
import React from 'react';

export const APIState = (props: ProviderState) => {
  return (
    <>
      <p>
        <>API Status:</>
        {props.loading ? 'Loading' : 'Ready'}
      </p>
      <p>
        <> Total results:</>
        <span>{props.total}</span>
      </p>
      <p>
        <> Offset:</>
        <span>{props.offset}</span>
      </p>
      <p>
        <> Limit:</>
        <span>{props.limit}</span>
      </p>
    </>
  );
};
