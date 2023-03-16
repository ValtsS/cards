import { CardProviderStore } from '../providers/card-provider';
import React from 'react';
import SearchBar from './searchbar';
import { MainPageState } from './states';
import CardShell from './card-shell';

interface MainPageProps {
  onSearchHook?: (searchQuery: string, searchpressed: boolean) => void;
  cardProvider: CardProviderStore;
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

  handleSearch = async () => {
    // Perform the search using the query in this.state.query
    // and update this.state.results with the results
    console.log('going to search ' + this.state.searchstring);
    if (this.props.onSearchHook) this.props.onSearchHook(this.state.searchstring ?? '', true);

    this.setState({
      cards: await this.props.cardProvider.load(this.state.searchstring ?? ''),
    });
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

        <CardShell data={this.state.cards} />
      </>
    );
  }
}

export default MainPage;
