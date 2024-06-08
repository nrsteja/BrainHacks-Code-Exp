// screens/SearchPage.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const API_KEY = '411ddaa2'; // Replace with your actual API key
    const endpoint = `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.Response === 'True') {
        setResults(data.Search);
        setError(''); // Clear any previous error message
      } else {
        setResults([]);
        setError(data.Error); // Set error message from the API response
      }
    } catch (error) {
      setResults([]);
      setError('An error occurred. Please try again later.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.resultItem}>
      <Image source={{ uri: item.Poster }} style={styles.thumbnail} />
      <View style={styles.resultText}>
        <Text style={styles.resultTitle}>{item.Title}</Text>
        <Text style={styles.resultDescription}>{item.Year}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search Movies..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          placeholderTextColor="#888"
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderItem}
          contentContainerStyle={styles.resultsContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 8,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  resultsContainer: {
    paddingBottom: 16,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: 80,
    height: 120,
    borderRadius: 4,
    marginRight: 12,
  },
  resultText: {
    flex: 1,
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  resultDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Search;
