import React from 'react';
import SearchBar from './searchbar';

class MainPage extends React.Component<null, MainPageState> {
  constructor(props: null) {
    super(props);

    const initialState: MainPageState = {
      searchstring: '123',
    };

    this.state = initialState;
  }

  handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({
      searchstring: event.target.value,
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
          query={this.state.searchstring}
          onQueryChange={this.handleQueryChange}
          onSearch={this.handleSearch}
        />
      </>
    );
  }
}

export default MainPage;
