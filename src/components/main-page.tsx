import React from 'react';
import SearchBar from './searchbar';
import { MainPageState } from './states';

interface MainPageProps {
  onSearchHook?: (searchQuery: string, searchpressed: boolean) => void;
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);

    const initialState: MainPageState = {};

    this.state = initialState;
  }

  handleQueryChange = (searchQuery: string) => {
    this.setState(() => ({
      searchstring: searchQuery,
    }));
    if (this.props.onSearchHook) this.props.onSearchHook(searchQuery, false);
  };

  handleSearch = () => {
    // Perform the search using the query in this.state.query
    // and update this.state.results with the results
    console.log('going to search ' + this.state.searchstring);
    if (this.props.onSearchHook) this.props.onSearchHook(this.state.searchstring ?? '', true);
  };

  render() {
    return (
      <>
        <SearchBar
          id={'bar01'}
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          testId="search-bar-test-id"
          title="Enter search query"
        />

        <div>AAA</div>
      </>
    );
  }
}

export default MainPage;
