import React from 'react';
import SearchBar from './searchbar';
import { MainPageState } from './states';

interface MainPageProps {
  onSearchHook?: (searchQuery: string, searchpressed: boolean) => void;
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);

    const initialState: MainPageState = {
      onSearchHook: props.onSearchHook,
    };

    this.state = initialState;
  }

  handleQueryChange = (searchQuery: string) => {
    this.setState(() => ({
      searchstring: searchQuery,
    }));
    if (this.state.onSearchHook) this.state.onSearchHook(searchQuery, false);
  };

  handleSearch = () => {
    // Perform the search using the query in this.state.query
    // and update this.state.results with the results
    console.log('going to search ' + this.state.searchstring);
    if (this.state.onSearchHook) this.state.onSearchHook(this.state.searchstring ?? '', true);
  };

  render() {
    return (
      <>
        <div>Enter search query</div>
        <SearchBar
          id={'bar01'}
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
          testId="search-bar-test-id"
        />
      </>
    );
  }
}

export default MainPage;
