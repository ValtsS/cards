import React from 'react';
class SearchBar extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement('input', {
        type: 'text',
        value: this.props.query,
        onChange: this.props.onQueryChange,
      }),
      React.createElement('button', { onClick: this.props.onSearch }, 'Search')
    );
  }
}
export default SearchBar;
