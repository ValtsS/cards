import React, { ReactElement } from 'react';

export const Rating = ({ count }: { count: number }): ReactElement => {
  const fullStars = '★'.repeat(count);
  const emptyStars = '☆'.repeat(5 - count);

  return (
    <div>
      <span>{fullStars}</span>
      <span>{emptyStars}</span>
    </div>
  );
};
