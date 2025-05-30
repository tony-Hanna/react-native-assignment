import React, { useState } from 'react';
import { TextInput, View, FlatList, Text, Pressable, ActivityIndicator } from 'react-native';
import { searchPlaces } from '../../../api/searchPlaces';
import { SearchPlacesStyle as styles } from './SearchPlaces.style';
import SearchIcon from '../../../assets/icons/SearchIcon';
import { useDebounce } from '../../../utils/Debounce';
import { useQuery } from '@tanstack/react-query';

const SearchBar = ({ onSelect }: { onSelect: (item: any) => void }) => {
  const [query, setQuery] = useState('');
  const debouncedSearch = useDebounce(query, 500);

  const { data: results = [], isLoading, error } = useQuery({
    queryKey: ['searchPlaces', debouncedSearch],
    queryFn: () => searchPlaces(debouncedSearch),
    enabled: !!debouncedSearch, 
  });

  const handleSelect = (item: any) => {
    onSelect(item); 
    setQuery('');  
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon style={styles.icon} />
        <TextInput
          placeholder="Search for a location"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          placeholderTextColor="#999"
        />
        {isLoading && <ActivityIndicator size="small" color="#999" />}
      </View>
      {error && (
        <Text style={{ color: 'red', padding: 10 }}>
          Error searching locations. Please try again.
        </Text>
      )}
      <FlatList
        data={results}
        keyExtractor={(item: any) => item.place_id.toString()}
        renderItem={({ item }: { item: any }) => (
          <Pressable onPress={() => handleSelect(item)}>
            <Text style={{ padding: 10 }}>{item.display_name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default SearchBar;
