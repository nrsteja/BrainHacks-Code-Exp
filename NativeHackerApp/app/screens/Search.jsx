import * as React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GroceryGrabber</Text>
      </View>
      <View style={styles.locationContainer}>
        <View>
          <Text style={styles.locationText}>Admiralty</Text>
        </View>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5121ce089381b2422822a439feb32a66d413e6a02d0b6026805587dfafd3634e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={styles.locationIcon}
        />
      </View>
      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Supermarket</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Item</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Recipe</Text>
        </TouchableOpacity>
      </View>
      <FilterButton onPress={() => console.log("Filters clicked")} />
      <View style={styles.resultsContainer}>
        <View>
          <Text style={styles.resultsTitle}>Results</Text>
        </View>
        {groceryData.map((item, index) => (
          <GroceryItem
            key={index}
            title={item.title}
            location={item.location}
            itemsOnSale={item.itemsOnSale}
            imageUrl={item.imageUrl}
            onPress={item.onPress}
          />
        ))}
      </View>
      <View style={styles.navBarContainer}>
        <TouchableOpacity style={styles.navBarButton}>
          <Text style={styles.navBarButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarButton}>
          <Text style={styles.navBarButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarButton}>
          <Text style={styles.navBarButtonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarButton}>
          <Text style={styles.navBarButtonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarButton}>
          <Text style={styles.navBarButtonText}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    maxWidth: 480,
    alignSelf: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    width: "100%",
    backgroundColor: "gray",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
    backgroundColor: "gray",
    borderRadius: 24,
    maxWidth: 323,
    alignSelf: "center",
  },
  locationText: {
    fontSize: 16,
    color: "white",
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
    backgroundColor: "gray",
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
    color: "white",
  },
  filterButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 8,
    marginTop: 8,
    backgroundColor: "gray",
    borderRadius: 30,
  },
  filterButtonTextContainer: {
    alignItems: "center",
  },
  filterButtonText: {
    fontSize: 16,
    color: "white",
  },
  filterButtonIconContainer: {
    alignItems: "center",
  },
  filterButtonIcon: {
    fontSize: 14,
    color: "#D1D5DB",
  },
  resultsContainer: {
    paddingHorizontal: 16,
    marginTop: 40,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#038400",
  },
  groceryItemContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "gray",
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
    backgroundColor: "gray",
    width: "100%",
  },
  navBarButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  navBarButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default MyComponent;
