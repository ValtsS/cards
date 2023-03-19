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

    const initialState: MainPageState = {
      ready: false,
    };
    this.state = initialState;
  }

  getKey(): string {
    return `mainpage_lastquery`;
  }

  componentDidMount(): void {
    if (!this.context) {
      throw new Error('AppContext provider is not present');
    }
    const searched = this.context.localstore.getItem(this.getKey());
    this.handleQueryChange(searched ?? '');
  }

  componentWillUnmount(): void {
    if (this.state.ready)
      this.context.localstore.setItem(this.getKey(), this.state.filteringBy ?? '');
  }

  handleQueryChange = async (searchQuery: string) => {
    this.setState({
      cards: await this.context.cardprovider.load(searchQuery),
      filteringBy: searchQuery,
      ready: true,
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
        />

        <CardShell data={this.state.cards} query={this.state.filteringBy} />
      </>
    );
  }
}

export default MainPage;
