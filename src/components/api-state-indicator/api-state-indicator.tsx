import { CardsResultStore, StoreStatus } from '@/slices/api/cardsApi';
import React from 'react';
import './api-state-indicator.css';

export const APIState = (props: CardsResultStore) => {
  const loading = props.status == StoreStatus.loading;
  return (
    <div className="api-state-container">
      <p>
        <strong>API Status:</strong>
        <span className={loading ? 'loading' : ''}>{props.status}</span>
      </p>
      <p>
        <strong>Total results:</strong>
        <span>{props.info.totalcount}</span>
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
        <span>{props.orderBy}</span>
      </p>
      <p>
        <strong>Has Prev?:</strong>
        <span>{props.info.pageInfo?.hasPreviousPage ? 'yes' : ''}</span>
      </p>
      <p>
        <strong>Has Next?:</strong>
        <span>{props.info.pageInfo?.hasNextPage ? 'yes' : ''}</span>
      </p>
    </div>
  );
};
