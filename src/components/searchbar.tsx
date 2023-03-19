import { AppContext } from '../providers/app-context-provider';
import React from 'react';
import './searchbar.css';

interface SearchProps {
  id: string;
  onQueryChange: (searchQuery: string, search: boolean) => void;
  testId?: string;
  title?: string;
  triggerOnLoad?: boolean;
}

interface LocalSearchState {
  lastquery: string;
  contextReady: boolean;
}

class SearchBar extends React.Component<SearchProps, LocalSearchState> {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;

  constructor(props: SearchProps) {
    super(props);
    const initialState: LocalSearchState = {
      lastquery: '',
      contextReady: false,
    };
    this.state = initialState;
  }

  getLastValue(): string {
    return this.context.localstore.getItem(this.getKey()) ?? '';
  }

  getKey(): string {
    return `searchbar_${this.props.id}_lastquery`;
  }

  componentDidMount(): void {
    const lastquery = this.getLastValue();
    this.setState({
      lastquery: lastquery,
      contextReady: true,
    });

    if (this.props.triggerOnLoad && this.props.triggerOnLoad.valueOf()) {
      this.handleChange(lastquery, false);
      this.handleChange(null, true);
    }
  }

  saveSearch(): void {
      this.context.localstore.setItem(this.getKey(), this.state.lastquery);
  }

  componentWillUnmount(): void {
    this.saveSearch();
  }

  handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.handleChange(event.target.value, false);
  };

  handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleChange = (filter: string | null, search: boolean) => {
    if (filter === null) {
      filter = this.state.lastquery;
    } else {
      this.setState({
        lastquery: filter,
      });
    }

    this.props.onQueryChange(filter, search);
  };

  handleSearch = () => {
    this.saveSearch();
    this.handleChange(null, true);
  };

  render() {
    return (
      <div className="search-container">
        <div>
          {this.props.title && <div>{this.props.title}</div>}
          {this.state.contextReady && (
            <>
              <input
                type="text"
                value={this.state.lastquery}
                onChange={this.handleQueryChange}
                data-testid={this.props.testId}
                onKeyDown={this.handleKeyPress}
              />
              <button onClick={this.handleSearch}>Search</button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBar;
