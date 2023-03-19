import React from 'react';
import SearchBar from './searchbar';
import { MainPageState } from './states';
import CardShell from './card-shell';
import { AppContext } from '../providers/app-context-provider';

interface MainPageProps {
  onSearch?: (searchQuery: string) => void;
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;

  constructor(props: MainPageProps) {
    super(props);

    const initialState: MainPageState = {};
    this.state = initialState;
  }

  handleQueryChange = async (searchQuery: string) => {
    this.setState({
      searchstring: searchQuery,
      cards: await this.context.cardprovider.load(searchQuery),
      filteringBy: searchQuery,
    });
    if (this.props.onSearch) this.props.onSearch(searchQuery);
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
        />

        <CardShell data={this.state.cards} query={this.state.filteringBy} />
      </>
    );
  }
}

export default MainPage;
