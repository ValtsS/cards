import React from 'react';
import SearchBar from './searchbar';
import { MainPageState } from './states';

class MainPage extends React.Component<object, MainPageState> {
  constructor(props: object) {
    super(props);

    const initialState: MainPageState = {};

    this.state = initialState;
  }

  handleQueryChange = (searchQuery: string) => {
    this.setState(() => ({
      searchstring: searchQuery,
    }));
  };

  handleSearch = () => {
    // Perform the search using the query in this.state.query
    // and update this.state.results with the results
    console.log('going to search ' + this.state.searchstring);
  };

  render() {
    return (
      <>
        {' '}
        !!!!!!!!
        <SearchBar
          id={'bar01'}
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
        />
      </>
    );
  }
}

export default MainPage;
