import React from 'react';
import './searchbar.css';

interface SearchProps {
  id: string;
  onQueryChange: (searchQuery: string) => void;
  onSearch: () => void;
  testId?: string;
  title?: string;
  triggerOnLoad?: boolean;
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

  componentDidMount(): void {
    this.setState({
      lastquery: this.getLastValue(),
    });
    if (this.props.triggerOnLoad && this.props.triggerOnLoad.valueOf()) this.handleSearch();
  }

  saveSearch(): void {
    localStorage.setItem(this.getKey(), this.state.lastquery);
  }

  componentWillUnmount(): void {
    this.saveSearch();
  }

  handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      lastquery: event.target.value,
    });

    this.props.onQueryChange(event.target.value);
  };

  handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') this.handleSearch();
  }

  handleSearch = () => {
    this.props.onSearch();
    this.saveSearch();
  };

  render() {
    return (
      <div className="search-container">
        <div>
          {this.props.title && <div>{this.props.title}</div>}
          <input
            type="text"
            value={this.state.lastquery}
            onChange={this.handleQueryChange}
            data-testid={this.props.testId}
            onKeyDown={this.handleKeyPress}
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
