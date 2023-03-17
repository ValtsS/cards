import { CardProviderStore } from '../providers/card-provider';
import React from 'react';
import SearchBar from './searchbar';
import { MainPageState } from './states';
import CardShell from './card-shell';
import { LocalStorageProvider } from 'providers/local-storage-provider';

interface MainPageProps {
  onSearchHook?: (searchQuery: string, searchpressed: boolean) => void;
  cardProvider: CardProviderStore;
  localStoreProvider: LocalStorageProvider;
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);

    const initialState: MainPageState = {};
    this.state = initialState;
  }

  handleQueryChange = async (searchQuery: string, search: boolean) => {
    this.setState({
      searchstring: searchQuery,
    });
    if (this.props.onSearchHook) this.props.onSearchHook(searchQuery, search);
    await this.handleSearch();
  };

  handleSearch = async () => {
    // Perform the search using the query in this.state.query
    // and update this.state.results with the results
    if (this.props.onSearchHook) this.props.onSearchHook(this.state.searchstring ?? '', true);
    console.log('handleSearch with state : ' + this.state.searchstring);
    this.setState({
      cards: await this.props.cardProvider.load(this.state.searchstring ?? ''),
      filteringBy: this.state.searchstring ?? '',
    });
  };

  render() {
    return (
      <>
        <SearchBar
          id={'bar01'}
          onQueryChange={this.handleQueryChange}
          testId="search-bar-test-id"
          title="Enter search query"
          triggerOnLoad={true}
          localstore={this.props.localStoreProvider}
        />

        <CardShell data={this.state.cards} query={this.state.filteringBy} />
      </>
    );
  }
}

export default MainPage;
