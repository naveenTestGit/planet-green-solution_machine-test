import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.search}
      placeholder="Search"
      value={value}
      onChangeText={onChangeText}
      clearButtonMode="while-editing"
      autoCorrect={false}
      autoCapitalize="none"
      returnKeyType="search"
    />
  );
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 12,
    fontSize: 15,
  },
});

export default React.memo(SearchBar);
