import { AppContext } from '../providers/app-context-provider';
import React from 'react';
import './searchbar.css';

interface SearchProps {
  id: string;
  onQueryChange: (searchQuery: string) => void;
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
      contextReady: false,
      lastquery: '',
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
      this.handleChange(lastquery, true);
    }
  }

  saveSearch(): void {
    if (this.state.contextReady)
      this.context.localstore.setItem(this.getKey(), this.state.lastquery);
  }

  componentWillUnmount(): void {
    this.saveSearch();
  }

  handleChange = (filter: string | undefined, search: boolean) => {
    const apply = filter === undefined ? this.state.lastquery : filter;

    if (apply != this.state.lastquery)
      this.setState({
        lastquery: apply,
      });
    if (search) this.props.onQueryChange(apply);
  };

  handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.handleChange(event.target.value, false);
  };

  handleSearch = () => {
    this.saveSearch();
    this.handleChange(undefined, true);
  };

  handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
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
