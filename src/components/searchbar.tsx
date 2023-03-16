import React from 'react';

interface SearchProps {
  id: string;
  onQueryChange: (searchQuery: string) => void;
  onSearch: () => void;
}

interface LocalSearchState {
  lastquery: string;
}

class SearchBar extends React.Component<SearchProps, LocalSearchState> {
  constructor(props: SearchProps) {
    super(props);

    const initialState: LocalSearchState = {
      lastquery: '',
    };

    this.state = initialState;
  }

  getKey(): string {
    return `searchbar_${this.props.id}_lastquery`;
  }

  componentDidMount() {
    this.setState({
      lastquery: localStorage.getItem(this.getKey()) ?? '',
    });
  }

  componentWillUnmount() {
    localStorage.setItem(this.getKey(), this.state.lastquery);
  }

  handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      lastquery: event.target.value,
    });

    this.props.onQueryChange(event.target.value);
  };

  render() {
    return (
      <div>
        <input type="text" value={this.state.lastquery} onChange={this.handleQueryChange} />
        <button onClick={this.props.onSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
