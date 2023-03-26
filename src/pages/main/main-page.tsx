import CardShell from '@/components/card-shell';
import SearchBar from '@/components/searchbar';
import { AppContext, CardData } from '@/providers';
import React from 'react';

interface MainPageProps {
  onSearch?: (searchQuery: string) => void;
}
export interface MainPageState {
  cards?: CardData[];
  filteringBy?: string;
  ready: boolean;
}

export class MainPage extends React.Component<MainPageProps, MainPageState> {
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
    const searched = this.context.localStore.getItem(this.getKey());
    this.handleQueryChange(searched ?? '');
  }

  componentWillUnmount(): void {
    if (this.state.ready)
      this.context.localStore.setItem(this.getKey(), this.state.filteringBy ?? '');
  }

  handleQueryChange = async (searchQuery: string) => {
    this.setState({
      cards: await this.context.cardProvider.loadTestData(searchQuery),
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
