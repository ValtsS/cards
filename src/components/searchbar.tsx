import React from 'react';

interface SearchProps {
  query?: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

class SearchBar extends React.Component<SearchProps> {
  render() {
    return (
      <div>
        <input type="text" value={this.props.query} onChange={this.props.onQueryChange} />
        <button onClick={this.props.onSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
