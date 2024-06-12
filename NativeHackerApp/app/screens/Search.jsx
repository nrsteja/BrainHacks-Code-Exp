import React, { useContext, useEffect, useCallback } from "react";
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
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Header from "../general components/header";
import COLORS from "../constants/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState, useRef } from "react";
import { Promo } from "./Home";
import { MARKETITEMS, RECIPES, ALLITEMS } from "./Lists";
import { SupermarketsContext } from "./MapContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getRecipeFromChatGPT,
  generateRecipePrompt,
} from "../api/recipeGenerator";
import { fetchImageFromUnsplash } from "../api/image";
import { REACT_APP_UNSPLASH_API } from "@env";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

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

export const MarketItem = ({
  marketName,
  location,
  image,
  name,
  expiryDate,
  itemsOnSale,
  price,
}) => (
  <TouchableOpacity style={styles.marketCard}>
    <Text style={styles.marketImage}>{image}</Text>
    <View style={styles.marketContent}>
      <Text style={styles.marketTitle}>{name}</Text>
      <Text style={styles.marketExpiry}>Expiring in: {expiryDate}</Text>
      <Text style={styles.marketSale}>Quantity: {itemsOnSale}</Text>
      <Text style={styles.marketPrice}>Price: ${price}</Text>
      <Text style={styles.marketLocation}>
        {marketName} {location}
      </Text>
    </View>
  </TouchableOpacity>
);

export const Recipe = ({
  location,
  name,
  image,
  marketName,
  ingredients,
  instructions,
  price,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.recipeContainer}
      onPress={() =>
        navigation.navigate("ShowRecipe", {
          location,
          name,
          image,
          marketName,
          ingredients,
          instructions,
        })
      }
    >
      {image ? (
        <ImageBackground
          source={{ uri: image }}
          style={[styles.mainImage, isFocused && styles.imageFocused]}
        >
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.locationText}>
              Find in {marketName}, {location}
            </Text>
            <Text style={styles.locationText}>
              You can make this recipe for just ${Math.round(price * 10) / 10}!
            </Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.locationText}>
            Find in {marketName}, {location}
          </Text>
          <Text style={styles.locationText}>
            You can make this recipe for just ${Math.round(price * 10) / 10}!
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
const hardcodedFilters = [
  { label: "All", value: "all" },
  { label: "Expiring", value: "expiringSoon" },
  { label: "Quantity", value: "quantityWise" },
  { label: "Price", value: "priceWise" },
];

const Search = () => {
  const [selectedButton, setSelectedButton] = useState("button1");
  const [searchText, setSearchText] = useState("");
  const [promos, setPromos] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const route = useRoute();

  // State for selected filter
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Function to handle filter change
  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    // You can add further logic here based on the selected filter
  };

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.blur();
    }
  }, [isDropdownOpen]);
  const {
    supermarkets,
    items,
    setItems,
    inventory,
    isMapInitialized,
    setSelectedMarket,
  } = useContext(SupermarketsContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const { supermarketName } = route.params || {};
    if (supermarketName) {
      setSearchText(supermarketName);
      setSelectedButton("button1");
    }
    generatePromos();
    //console.log(generateItemsArray(items))
    //setRecipes(recipeGenerator(groupIngredientsBySupermarket(generateItemsArray(items))));
  }, [supermarkets, route.params]);

  const filterData = (data) => {
    let filteredData = data;
    console.log(data);
    if (searchQuery) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (selectedFilter) {
      case "expiringSoon":
        filteredData = filteredData.sort((a, b) => {
          // Extract numeric part from the "expiryDate" strings
          const daysA = parseInt(a.expiryDate.split(" ")[0]);
          const daysB = parseInt(b.expiryDate.split(" ")[0]);

          // Compare the numeric values
          return daysA - daysB;
        });
      case "quantityWise":
        filteredData = filteredData.sort(
          (a, b) => b.itemsOnSale - a.itemsOnSale
        );
        break;
      case "priceWise":
        filteredData = filteredData.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    return filteredData;
  };

  const groupIngredientsBySupermarket = (itemsArray) => {
    const supermarketIngredients = {};

    itemsArray.forEach((item) => {
      const [marketName, location, ingredient, price] = item;
      const key = `${marketName} - ${location}`;

      if (!supermarketIngredients[key]) {
        supermarketIngredients[key] = {
          ingredients: [],
          totalPrice: 0.0,
        };
      }

      supermarketIngredients[key].ingredients.push(ingredient.name);
      supermarketIngredients[key].totalPrice =
        supermarketIngredients[key].totalPrice + price;
    });

    return Object.entries(supermarketIngredients).map(
      ([marketLocation, { ingredients, totalPrice }]) => {
        const [marketName, location] = marketLocation.split(" - ");
        return {
          marketName,
          location,
          ingredients,
          totalPrice,
        };
      }
    );
  };

  const generateItemsArray = (newItems) => {
    const itemsArray = newItems.reduce((accumulator, currentItem) => {
      currentItem.items.forEach((item) => {
        if (item && typeof item === "object") {
          accumulator.push(item);
        }
      });
      return accumulator;
    }, []);

    return itemsArray;
  };

  const recipeResults = async (item) => {
    const ingredient = item["ingredients"];
    const inventoryIngredients = inventory.map((item) => item.name); //Adding the current inventory ingredients.

    ingredient.push(...inventoryIngredients); //Pushing the inventory to the list of ingredients.

    const prompt = generateRecipePrompt(ingredient);
    try {
      const result = await getRecipeFromChatGPT(prompt);
      result["marketName"] = item["marketName"];
      result["location"] = item["location"];
      result["price"] = item["totalPrice"];
      result["name"] = result.name;

      // Fetch image from Unsplash
      try {
        const imageUrl = await fetchImageFromUnsplash(
          result.name,
          REACT_APP_UNSPLASH_API
        );
        result["image"] = imageUrl;
        // result["image"] =
        //   "https://hips.hearstapps.com/hmg-prod/images/types-of-bread-1666723473.jpg";
      } catch (error) {
        console.log("Error fetching recipe image:", error);
        result["image"] =
          "https://hips.hearstapps.com/hmg-prod/images/types-of-bread-1666723473.jpg";
      }
      return result;
    } catch (error) {
      console.log("Error fetching recipe results:", error);
      throw error;
    }
  };

  const recipeGenerator = async (supermarketArray) => {
    const allRecipes = [];
    for (let index = 0; index < 3; index++) {
      const recipe = await recipeResults(supermarketArray[index]);

      allRecipes.push(recipe);
    }

    return allRecipes;
  };

  const generatePromos = async () => {
    let id = 1;
    let marketId = 1;
    const newPromos = supermarkets.map((s) => ({
      id: id++,
      name: s.name,
      location: s.vicinity,
      itemsOnSale: Math.floor(Math.random() * 4) + 2,
    }));

    setPromos(newPromos);

    const newItems = newPromos.map((item) => {
      let items = [];

      for (let i = 0; i < item.itemsOnSale; i++) {
        items.push([
          item.name,
          item.location,
          ALLITEMS[Math.floor(Math.random() * ALLITEMS.length)],
          parseFloat((Math.random() * 4 + 1).toFixed(1)),
        ]);
      }

      return {
        items: items,
      };
    });

    const appendItems = generateItemsArray(newItems);

    const allItems = appendItems.map((item) => ({
      id: marketId++,
      marketName: item[0],
      location: item[1],
      image: item[2].emoji,
      name: item[2].name,
      expiryDate: item[2].daysLeft,
      itemsOnSale: item[2].quantity,
      price: item[3],
    }));

    setItems(allItems);

    setIsLoading(true);
    const genRecipes = await recipeGenerator(
      groupIngredientsBySupermarket(appendItems)
    );
    setRecipes(genRecipes);
    setIsLoading(false);
  };

  const handlePress = (button) => {
    setSelectedButton(button);
  };

  const filterDataRecipe = (data) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const renderPromo = ({ item }) => (
    <Promo
      name={item.name}
      location={item.location}
      itemsOnSale={item.itemsOnSale}
      image={item.image}
      onPress={() => (
        setSelectedMarket(item.location), navigation.navigate("ListItems")
      )}
    />
  );

  const renderMarket = ({ item }) => (
    <MarketItem
      marketName={item.marketName}
      location={item.location}
      image={item.image}
      name={item.name}
      expiryDate={item.expiryDate}
      itemsOnSale={item.itemsOnSale}
      price={item.price}
    />
  );

  const renderRecipe = (
    { item } // { location, name, image, marketName }
  ) => (
    <Recipe
      // rating={item.rating}
      location={item.location}
      name={item.name}
      marketName={item.marketName}
      image={item.image}
      ingredients={item.ingredients}
      instructions={item.instructions}
      price={item.price}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search items"
          placeholderTextColor={"white"}
          style={styles.searchText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Ionicons
            name="options-outline"
            size={24}
            color="white"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
      {isDropdownOpen && (
        <DropDownPicker
          open={isDropdownOpen}
          items={hardcodedFilters}
          setOpen={setIsDropdownOpen}
          value={selectedFilter}
          setValue={setSelectedFilter}
          onChangeValue={handleFilterChange}
          onSelectItem={(item) => console.log(item)}
        />
      )}
      <View
        style={{
          flex: 0.15,
          justifyContent: "center",
          marginTop: "1%",
        }}
      >
        <View
          style={{ flex: 0.3, flexDirection: "row", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedButton === "button1" && styles.selectedButton,
            ]}
            onPress={() => handlePress("button1")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedButton === "button1" && styles.selectedButtonText,
              ]}
            >
              Supermarket
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedButton === "button2" && styles.selectedButton,
            ]}
            onPress={() => handlePress("button2")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedButton === "button2" && styles.selectedButtonText,
              ]}
            >
              Item
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedButton === "button3" && styles.selectedButton,
            ]}
            onPress={() => handlePress("button3")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedButton === "button3" && styles.selectedButtonText,
              ]}
            >
              Recipe
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.55 }}></View>
      </View>
      <View style={{ flex: 0.8, paddingHorizontal: 0.04 * width }}>
        <View style={{ flex: 0.1 }}>
          <Text style={styles.resultsText}>Results</Text>
        </View>
        <View style={{ flex: 0.9, marginBottom: 0.05 * height }}>
          {selectedButton === "button1" &&
            (!isMapInitialized ? (
              <View style={styles.loadingContainer}>
                <Text>Proceed to the map page to initialize your choices!</Text>
              </View>
            ) : (
              <FlatList
                data={filterDataRecipe(promos)}
                renderItem={renderPromo}
                keyExtractor={(item) => item.id}
                persistentScrollbar={true}
              />
            ))}
          {selectedButton === "button2" &&
            (!isMapInitialized ? (
              <View style={styles.loadingContainer}>
                <Text>Proceed to the map page to initialize your choices!</Text>
              </View>
            ) : (
              <FlatList
                data={filterData(items)}
                renderItem={renderMarket}
                keyExtractor={(item) => item.id}
                persistentScrollbar={true}
              />
            ))}
          {selectedButton === "button3" &&
            (!isMapInitialized ? (
              <View style={styles.loadingContainer}>
                <Text>Proceed to the map page to initialize your choices!</Text>
              </View>
            ) : isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.green} />
                <Text style={{ fontSize: 0.05 * width, fontWeight: 200 }}>
                  Cooking up a recipe for you...
                </Text>
              </View>
            ) : (
              <FlatList
                data={filterDataRecipe(recipes)}
                renderItem={renderRecipe}
                keyExtractor={(item) => item.id}
                persistentScrollbar={true}
              />
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: "100%",
    alignSelf: "center",
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
  groceryItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: width * 0.04,
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
  },
  groceryItemImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 8,
    marginRight: width * 0.04,
  },
  groceryItemDetails: {
    flex: 1,
  },
  groceryItemTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  groceryItemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.01,
  },
  promotionsText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: COLORS.dark_green,
    textAlign: "left",
    marginTop: height * 0.02,
  },
  promotionBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
    padding: width * 0.02,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
  },
  promotionImage: {
    width: width * 0.15,
    height: width * 0.15,
    marginRight: width * 0.02,
    borderRadius: 4,
  },
  promotionDetails: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  promotionSubtitle: {
    fontSize: width * 0.035,
    color: "#555",
  },
  promotionItems: {
    fontSize: width * 0.03,
    color: "#999",
  },
  expiringText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: COLORS.dark_green,
    textAlign: "left",
    marginTop: height * 0.02,
  },
  expiryFont: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  itemsFont: {
    fontSize: width * 0.04,
  },
  trackerText: {
    marginTop: height * 0.015,
    fontSize: width * 0.04,
    color: COLORS.dark_green,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  filterButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.02,
  },
  flatListContainer: {
    flex: 0.9,
    paddingHorizontal: width * 0.04,
  },
  searchIcon: {
    position: "absolute",
    left: width * 0.05,
  },
  marketImage: {
    fontSize: 0.1 * width,
    marginRight: width * 0.02,
    borderRadius: 4,
  },
  marketContent: {
    flex: 1,
  },
  marketTitle: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  marketExpiry: {
    fontSize: width * 0.035,
    color: COLORS.black,
  },
  marketSale: {
    fontSize: width * 0.03,
    color: "#999",
  },
  marketPrice: {
    fontSize: width * 0.03,
    fontWeight: "500",
  },
  marketLocation: {
    fontSize: 0.03 * width,
  },
  marketCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
    padding: width * 0.02,
    borderWidth: 1,
    borderColor: COLORS.brown,
    borderRadius: 8,
  },
  recipeContainer: {
    width: 0.9 * width,
    height: 0.2 * height,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  topContainer: {
    position: "relative",
    display: "flex",
    width: "100%",
    alignItems: "stretch",
    gap: 20,
    whiteSpace: "nowrap",
    justifyContent: "space-between",
  },
  ratingContainer: {
    alignItems: "stretch",
    borderRadius: 8,
    backdropFilter: "blur(2.5px)",
    backgroundColor: "rgba(48, 48, 48, 0.30)",
    display: "flex",
    gap: 4,
    padding: "4px 8px",
  },
  starIcon: {
    position: "relative",
    width: 16,
    flexShrink: 0,
    margin: "auto 0",
    aspectRatio: "1",
  },
  iconShadow: {
    filter: "drop-shadow(0px 8px 25px rgba(32, 32, 32, 0.15))",
    alignSelf: "start",
    position: "relative",
    width: 31,
    flexShrink: 0,
    aspectRatio: "1.19",
  },
  locationContainer: {
    position: "relative",
    display: "flex",
    alignItems: "stretch",
    gap: 4,
    color: "#FFF",
    fontWeight: "700",
  },
  locationIcon: {
    position: "relative",
    width: 16,
    flexShrink: 0,
    aspectRatio: "1",
  },
  titleContainer: {
    position: "relative",
    marginTop: 18,
    font: "16px/22px Poppins, sans-serif",
  },
  infoContainer: {
    alignItems: "stretch",
    position: "relative",
    display: "flex",
    marginTop: 5,
    gap: 7,
    fontSize: 12,
    fontWeight: "400",
  },
  divider: {
    borderColor: "rgba(255, 255, 255, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#FFF",
    width: 1,
    flexShrink: 0,
    height: 18,
  },
  recipeContainer: {
    marginBottom: 15,
  },
  mainImage: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  imageFocused: {
    opacity: 0.7,
  },
  textContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Translucent background for better readability
    padding: 10,
    borderRadius: 10,
  },
  nameText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  locationText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0.2 * height,
  },
  // inputView: {
  //   flex: 0.1,
  //   justifyContent: "center",

  //   marginTop: height * 0.01,
  // },
  searchContainer: {
    flex: 0.05,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    marginTop: "5%",
    marginVertical: "1.5%",
    width: "100%",
    backgroundColor: COLORS.green,
    alignSelf: "center",
    maxWidth: "80%",
    borderRadius: 40,
  },
  searchText: {
    fontSize: 18,
    color: "white",
    flex: 1,
    paddingRight: 10,
  },
});
export default Search;
