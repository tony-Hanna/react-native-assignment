import { render } from "@testing-library/react-native";
import SearchBar from "../SearchPlaces";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const props ={
   onSelect: jest.fn()
}
const queryClient = new QueryClient()
it('matches snapshot', () => {
    const { toJSON, getByPlaceholderText } = render(
    <QueryClientProvider client={queryClient}>
        <SearchBar {...props}/>;
    </QueryClientProvider>
    )
    expect(getByPlaceholderText('Search for a location')).toBeTruthy()
    expect(toJSON()).toMatchSnapshot();
  });