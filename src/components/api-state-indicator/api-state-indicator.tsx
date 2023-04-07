import { ProviderState } from '@/providers/card/api-provider';
import React from 'react';
import './api-state-indicator.css';

export const APIState = (props: ProviderState) => {
  return (
    <div className="api-state-container">
      <p>
        <strong>API Status:</strong>
        <span className={props.loading ? 'loading' : ''}>
          {props.loading ? 'Loading' : 'Ready'}
        </span>
      </p>
      <p>
        <strong>Total results:</strong>
        <span>{props.total}</span>
      </p>
      <p>
        <strong>Offset:</strong>
        <span>{props.offset}</span>
      </p>
      <p>
        <strong>Limit:</strong>
        <span>{props.limit}</span>
      </p>
      <p>
        <strong>Sorting:</strong>
        <span>{props.sortingBy}</span>
      </p>
    </div>
  );
};
