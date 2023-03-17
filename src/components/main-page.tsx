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

    if (search)
    {
      this.setState({
        searchstring: searchQuery,
        cards: await this.props.cardProvider.load(searchQuery),
        filteringBy: searchQuery ?? '',
      });

    } else {

      this.setState({
        searchstring: searchQuery
      });

    }


    if (this.props.onSearchHook) this.props.onSearchHook(searchQuery, search);
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
