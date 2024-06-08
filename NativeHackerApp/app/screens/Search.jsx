import * as React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../general components/header";
import COLORS from "../constants/colors"


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

const GroceryItem = ({ title, location, itemsOnSale, imageUrl, onPress }) => (
  <TouchableOpacity style={styles.groceryItemContainer} onPress={onPress}>
    <Image source={{ uri: imageUrl }} style={styles.groceryItemImage} />
    <View style={styles.groceryItemDetails}>
      <View>
        <Text style={styles.groceryItemTitle}>{title}</Text>
      </View>
      <View>
        <Text>{location}</Text>
      </View>
      <View style={styles.groceryItemFooter}>
        <Text>Items on sale: {itemsOnSale}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const MyComponent = () => {
  const groceryData = [
    {
      title: "Fairprice",
      location: "Kampung Admiralty",
      itemsOnSale: 11,
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/233402a655fce3616d5404a84b9c5cfa3816ca29d7f7e9f57002b53e34d3e79f?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
      onPress: () => console.log("Fairprice clicked"),
    },
    {
      title: "Cold Storage",
      location: "Causeway Point",
      itemsOnSale: 2,
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c03b51cecc85bf286bcb805b286071226ee009e347f7e995a30b085156157c0e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
      onPress: () => console.log("Cold Storage clicked"),
    },
    {
      title: "Giant",
      location: "Admiralty MRT",
      itemsOnSale: 4,
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c63809a49994ae4e0643f0535a928d4afa6deda515c329258fc88bcd34fb7e4e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
      onPress: () => console.log("Giant clicked"),
    },
  ];

  return (
    <SafeAreaView>
      <Header />
      <View style = {{marginHorizontal: "10%", marginVertical: "1%", borderWidth: 5, borderRadius: "50%"}}>

      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    maxWidth: 480,
    alignSelf: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    width: "100%",
    backgroundColor: COLORS.green,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
    backgroundColor: COLORS.grey,
    borderRadius: 24,
    maxWidth: 323,
    alignSelf: "center",
  },
  locationText: {
    fontSize: 16,
    color: COLORS.white,
  },
  locationIcon: {
    width: 36,
    height: 36,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    maxWidth: 280,
    alignSelf: "center",
  },
  navButton: {
    backgroundColor: COLORS.grey,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 24,
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  navButtonText: {
    fontSize: 14,
    color: COLORS.white,
  },
  filterButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 8,
    marginTop: 8,
    backgroundColor: COLORS.grey,
    borderRadius: 30,
  },
  filterButtonTextContainer: {
    alignItems: "center",
  },
  filterButtonText: {
    fontSize: 16,
    color: COLORS.white,
  },
  filterButtonIconContainer: {
    alignItems: "center",
  },
  filterButtonIcon: {
    fontSize: 14,
    color: COLORS.grey,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    marginTop: 40,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark_green,
  },
  groceryItemContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: COLORS.grey,
    paddingVertical: 8,
    marginTop: 10,
  },
  groceryItemImage: {
    width: 106,
    height: 106,
  },
  groceryItemDetails: {
    justifyContent: "center",
    marginLeft: 12,
  },
  groceryItemTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  groceryItemFooter: {
    marginTop: 10,
  },
  navBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: COLORS.grey,
    width: "100%",
  },
  navBarButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  navBarButtonText: {
    fontSize: 16,
    color: COLORS.white,
  },
});

export default MyComponent;
