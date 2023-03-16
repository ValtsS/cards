export interface MainPageState {
  searchstring?: string;
  onSearchHook?: (searchQuery: string, searchpressed: boolean) => void;
}
