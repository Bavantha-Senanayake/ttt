export type RootStackParamList = {
  Login: undefined;
  Welcome: undefined;
  AddPost: undefined;
  MainTabs: undefined;
  InstantFind: undefined;
  Categories: undefined;
  ProviderProfile: { workerId: string };
  SearchResults: {
    searchQuery?: string;
    category?: string;
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Jobs: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}