import React from 'react';
import './searchbar.css';

interface SearchProps {
  id: string;
  onQueryChange: (searchQuery: string) => void;
  onSearch: () => void;
  testId?: string;
  title?: string;
}

interface LocalSearchState {
  lastquery: string;
}

class SearchBar extends React.Component<SearchProps, LocalSearchState> {
  constructor(props: SearchProps) {
    super(props);
    const initialState: LocalSearchState = {
      lastquery: this.getLastValue(),
    };

    this.state = initialState;
  }

  getLastValue(): string {
    return localStorage.getItem(this.getKey()) ?? '';
  }

  getKey(): string {
    return `searchbar_${this.props.id}_lastquery`;
  }

  componentDidMount() {
    this.setState({
      lastquery: this.getLastValue(),
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
      <div className="search-container">
        <form>
          {this.props.title && <div>{this.props.title}</div>}
          <input
            type="text"
            value={this.state.lastquery}
            onChange={this.handleQueryChange}
            data-testid={this.props.testId}
          />
          <button onClick={this.props.onSearch}>Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
