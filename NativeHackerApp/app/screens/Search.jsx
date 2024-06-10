import * as React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import Header from "../general components/header";
import COLORS from "../constants/colors"
import { useState, useEffect } from "react";
import { Promo } from "./Home";
import { PROMOS, RECIPES } from "./Lists";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const FilterButton = ({ onPress }) => (
  <TouchableOpacity style={styles.filterButtonContainer} onPress={onPress}>
    <View style={styles.filterButtonTextContainer}>
      <Text style={styles.filterButtonText}>Filters</Text>
    </View>
    <View style={styles.filterButtonIconContainer}>
      <Text style={styles.filterButtonIcon}>expand_more</Text>
    </View>
  </TouchableOpacity>
);

const InfoItem = ({ children }) => (
  <View>
    <Text>{children}</Text>
  </View>
);

const fetchRecipes = async () => {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/recipe?query=pasta', {
      headers: {
        'X-Api-Key': 'PdUnDIhPrcAFjNOW5+sAfg==mlHbKzvxMu3YimkI',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const Recipe = ({ rating, location, name, numIng, time, image }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  const handleFocus = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={styles.recipeContainer}
      onPress={handleFocus}
      onBlur={handleBlur}
    >
      <Image source={{ uri: image }} style={styles.mainImage} />
      <Animated.View style={[styles.recipeDetails, { opacity: fadeAnim }]}>
        <Text style={styles.recipeName}>{name}</Text>
        <Text style={styles.recipeRating}>Rating: {rating}</Text>
        <Text style={styles.recipeLocation}>Location: {location}</Text>
        <Text style={styles.recipeNumIng}>Number of Ingredients: {numIng}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Search = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };

    getRecipes();
  }, []);

  const handlePress = (button) => {
    setSelectedButton(button);
  };

  const filterData = (data) => {
    if (!Array.isArray(data)) return [];
    return data.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
  }

  const renderPromo = ({ item }) => (
    <Promo
      name={item.name}
      location={item.location}
      itemsOnSale={item.itemsOnSale}
      image={item.image}
    />
  );

  const renderRecipe = ({ item }) => (
    <Recipe
      rating={item.rating}
      location={item.location}
      name={item.name}
      numIng={item.num_ingredients} // Ensure this matches your API response
      time={item.time}
      image={item.image_url} // Ensure this matches your API response
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.inputView}>
        <TextInput placeholder="Enter a location" style={styles.input} value={searchText} onChangeText={setSearchText} />
      </View>
      <View style={{ flex: 0.15, justifyContent: "center", marginTop: "1%" }}>
        <View style={{ flex: 0.3, flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity style={[styles.filterButton, selectedButton === 'button1' && styles.selectedButton]} onPress={() => handlePress('button1')}>
            <Text style={[styles.buttonText, selectedButton === 'button1' && styles.selectedButtonText]}>Supermarket</Text>
          </TouchableOpacity >
          <TouchableOpacity style={[styles.filterButton, selectedButton === 'button2' && styles.selectedButton]} onPress={() => handlePress('button2')}>
            <Text style={[styles.buttonText, selectedButton === 'button2' && styles.selectedButtonText]}>Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, selectedButton === 'button3' && styles.selectedButton]} onPress={() => handlePress('button3')}>
            <Text style={[styles.buttonText, selectedButton === 'button3' && styles.selectedButtonText]}>Recipe</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.7 }}>
        </View>
      </View>
      <View style={{ flex: 0.75, paddingHorizontal: 0.04 * width }}>
        <View style={{ flex: 0.1 }}>
          <Text style={styles.resultsText}>Results</Text>
        </View>
        <View style={{ flex: 0.9 }}>
          {selectedButton === 'button1' && (
            <FlatList
              data={filterData(PROMOS)}
              renderItem={renderPromo}
              keyExtractor={(item) => item.id}
              persistentScrollbar={true}
            />)}
          {selectedButton === 'button2' && (
            <Text>No Market Items</Text>
            // If MarketItem is needed, uncomment below and define MarketItem
            // <FlatList
            //   data={filterData(MARKETITEMS)}
            //   renderItem={renderMarket}
            //   keyExtractor={(item) => item.id}
            //   persistentScrollbar={true}
            // />
          )}
          {selectedButton === 'button3' && (
            <FlatList
              data={filterData(recipes)}
              renderItem={renderRecipe}
              keyExtractor={(item) => item.id}
              persistentScrollbar={true}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: "100%",
    alignSelf: "center",
  },
  inputView: {
    flex: 0.1,
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.01,
  },
  input: {
    flex: 0.8,
    height: height * 0.06,
    borderRadius: 20,
    paddingLeft: width * 0.05,
    fontSize: width * 0.04,
    color: COLORS.white,
    backgroundColor: COLORS.green,
  },
  filterButton: {
    width: width * 0.28,
    height: height * 0.06,
    backgroundColor: "white",
    marginHorizontal: width * 0.02,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: COLORS.green,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: width * 0.04,
  },
  selectedButtonText: {
    color: COLORS.white,
  },
  resultsText: {
    color: COLORS.dark_green,
    fontWeight: "200",
    fontSize: width * 0.06,
  },
  recipeContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  mainImage: {
    width: "100%",
    height: 200,
  },
  recipeDetails: {
    padding: 15,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  recipeRating: {
    fontSize: 16,
    color: "#888",
  },
  recipeLocation: {
    fontSize: 16,
    color: "#888",
  },
  recipeNumIng: {
    fontSize: 16,
    color: "#888",
  },
});

export default Search;
