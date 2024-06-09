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
  FlatList
} from "react-native";
import Header from "../general components/header";
import COLORS from "../constants/colors"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { PROMOS, Promo, ITEMS, Item } from "./Home";

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
  const [selectedButton, setSelectedButton] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handlePress = (button) => {
    setSelectedButton(button);
  };

  const filterData = (data) => {
    return data.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
  }

  const renderPromo = ({ item }) => (
    <Promo
      name={item.name}
      location={item.location}
      itemsOnSale={item.itemsOnSale}
      image={item.image}
    />
  );

  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      daysLeft={item.daysLeft}
      used={item.used}
    />
  );

  return (
    <SafeAreaView style = {styles.container}>
      <Header />
      <View style = {styles.inputView}>
        <TextInput defaultValue = "Enter a location" style = {styles.input} value = {searchText} onChangeText={setSearchText}/>
        <MaterialCommunityIcons style = {{position: "absolute", left: 0.14 * width}} name="map-search" size={0.1 * width} color = "black" />
      </View>
      <View style = {{flex: 0.15, justifyContent: "center", marginTop: "1%"}}>
        <View style = {{flex: 0.3, flexDirection: "row", justifyContent: "center"}}>
          <TouchableOpacity style = {[styles.filterButton, selectedButton === 'button1' && styles.selectedButton]} onPress={() => handlePress('button1')}>
            <Text style = {[styles.buttonText, selectedButton === 'button1' && styles.selectedButtonText]}>Supermarket</Text>
          </TouchableOpacity >
          <TouchableOpacity style = {[styles.filterButton, selectedButton === 'button2' && styles.selectedButton]} onPress={() => handlePress('button2')}>
            <Text style = {[styles.buttonText, selectedButton === 'button2' && styles.selectedButtonText]}>Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.filterButton, selectedButton === 'button3' && styles.selectedButton]} onPress={() => handlePress('button3')}>
            <Text style = {[styles.buttonText, selectedButton === 'button3' && styles.selectedButtonText]}>Recipe</Text>
          </TouchableOpacity>
        </View>
        <View style = {{flex: 0.7}}>

        </View>
      </View>
      <View style = {{flex: 0.75, paddingHorizontal: 0.04 * width}}>
        <View style = {{flex: 0.1}}>
          <Text style = {styles.resultsText}>Results</Text>
        </View>
        <View style = {{flex: 0.9}}>
          {selectedButton === 'button1' && (
          <FlatList
            data={filterData(PROMOS)}
            renderItem={renderPromo}
            keyExtractor={(item) => item.id}
            persistentScrollbar={true}
          />)}
          {selectedButton === 'button2' && (
          <FlatList
            data={filterData(ITEMS)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            persistentScrollbar={true}
          />
          )}
          {selectedButton === 'button3' && (
          <FlatList
            data={filterData(ITEMS)}
            renderItem={renderItem}
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
    paddingHorizontal: 0.1 * width,
    marginTop: 0.01 * height
  },
  input: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingLeft: "22.5%",
    fontSize: 0.02 * height,
    color: COLORS.white,
    backgroundColor: COLORS.green
  },
  filterButton: {
    width: 0.25 * width, 
    height: 0.03 * height,
    backgroundColor: "white", 
    marginHorizontal: 0.01 * width, 
    borderRadius: 1000, 
    justifyContent: "center", 
    alignItems: "center"
  },
  selectedButton: {
    backgroundColor: COLORS.green,
  },
  buttonText: {
    color: COLORS.black
  },
  selectedButtonText: {
    color: COLORS.white
  },
  resultsText: {
    color: COLORS.dark_green,
    fontWeight: "200",
    fontSize: 0.07 * width,
  },
  promotionsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark_green,
    textAlign: "left",
    marginTop: 20,
  },
  promotionBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
  },
  promotionImage: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 4,
  },
  promotionDetails: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  promotionSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  promotionItems: {
    fontSize: 12,
    color: "#999",
  },
  expiringText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark_green,
    textAlign: "left",
    marginTop: 20,
  },
  expiryFont: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemsFont: {
    fontSize: 16,
  },
  trackerText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.dark_green,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default MyComponent;
