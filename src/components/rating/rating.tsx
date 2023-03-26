import React from 'react';

interface RatingProps {
  count: number;
}

export class Rating extends React.Component<RatingProps> {
  render() {
    const { count } = this.props;
    const fullStars = '★'.repeat(count);
    const emptyStars = '☆'.repeat(5 - count);

    return (
      <div>
        <span>{fullStars}</span>
        <span>{emptyStars}</span>
      </div>
    );
  }
}
