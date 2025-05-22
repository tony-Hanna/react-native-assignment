import React, { useState, useEffect } from 'react';
import { TextInput, View, FlatList, Text, Pressable } from 'react-native';
import { searchPlaces } from '../../../api/searchPlaces';
import { SearchPlacesStyle as styles } from './SearchPlaces.style';
import SearchIcon from '../../../assets/icons/SearchIcon';
const SearchBar = ({ onSelect }: { onSelect: (item: any) => void }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        searchPlaces(query).then(setResults);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (item: any) => {
    onSelect(item); 
    setQuery('');  
    setResults([]); 
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
      </View>
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
