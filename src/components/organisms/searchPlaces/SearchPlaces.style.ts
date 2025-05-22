import { StyleSheet } from "react-native";
export const SearchPlacesStyle = StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginTop: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 12,
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    resultsList: {
      marginTop: 10,
      maxHeight: 250,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    },
    resultItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    resultText: {
      fontSize: 14,
      color: '#444',
    },
  });