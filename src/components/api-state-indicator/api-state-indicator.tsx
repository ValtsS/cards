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
        <strong>Total results:</strong> {props.total}
      </p>
      <p>
        <strong>Offset:</strong> {props.offset}
      </p>
      <p>
        <strong>Limit:</strong> {props.limit}
      </p>
    </div>
  );
};
