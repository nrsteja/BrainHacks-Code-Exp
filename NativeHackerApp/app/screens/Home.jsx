import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Platform,
  StyleSheet,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CheckBox from '@react-native-community/checkbox';

const getFontFamily = () => {
  if (Platform.OS === "ios") {
    return "Avenir-Book";
  } else if (Platform.OS === "android") {
    return "sans-serif";
  }
  return "System";
};

const ITEMS = [
  {
    id: '1',
    itemName: "White Bread",
    daysLeft: 3,
    used: true,
  },
  {
    id: '2',
    itemName: "Spinach",
    daysLeft: 1,
    used: true,
  },
  {
    id: '3',
    itemName: "Milk - Gardenia",
    daysLeft: 4,
    used: true,
  },
];

const PROMOS = [
  {
    id: '1',
    name: "FairPrice",
    location: "Kampung Admiralty",
    itemsOnSale: 11,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/233402a655fce3616d5404a84b9c5cfa3816ca29d7f7e9f57002b53e34d3e79f?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
  },
  {
    id: '2',
    name: "ColdStorage",
    location: "Causeway Point",
    itemsOnSale: 2,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c03b51cecc85bf286bcb805b286071226ee009e347f7e995a30b085156157c0e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
  },
  {
    id: '3',
    name: "Giant",
    location: "Admiralty MRT",
    itemsOnSale: 4,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c63809a49994ae4e0643f0535a928d4afa6deda515c329258fc88bcd34fb7e4e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
  },
  {
    id: '4',
    name: "Prime",
    location: "NTU",
    itemsOnSale: 2,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c63809a49994ae4e0643f0535a928d4afa6deda515c329258fc88bcd34fb7e4e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
  },
];

const FoodSaved = ({ amount }) => (
  <View style={styles.savingsBox}>
    <Text style={styles.savingsText}>{amount} kg</Text>
    <Text style={styles.savingsLabel}>of food saved</Text>
  </View>
);

const MoneySaved = ({ amount }) => (
  <View style={styles.savingsBox}>
    <Text style={styles.savingsText}>$ {amount}</Text>
    <Text style={styles.savingsLabel}>of money saved</Text>
  </View>
);

const Item = ({ itemName, daysLeft, used }) => (
  <View>
    <View style={{ flexDirection: "row", justifyContent: "center"}}>
      <View style={{ flex: 0.6 }}>
        <Text style={styles.itemsFont}>{itemName}</Text>
      </View>
      <View style={{ flex: 0.2, alignItems: "center" }}>
        <Text style={styles.itemsFont}>{daysLeft}</Text>
      </View>
      <View style={{ flex: 0.2, alignItems: "flex-end"}}>
        <Text style = {styles.itemsFont}>Y/N</Text>
      </View>
    </View>
  </View>
);

const Promo = ({ name, location, itemsOnSale, image }) => (
  <TouchableOpacity
    style={styles.promotionBox}
    onPress={() => handlePromotionPress(name)}
  >
    <Image
      source={{
        uri: image,
      }}
      style={styles.promotionImage}
    />
    <View style={styles.promotionDetails}>
      <Text style={styles.promotionTitle}>{name}</Text>
      <Text style={styles.promotionSubtitle}>{location}</Text>
      <Text style={styles.promotionItems}>Items On Sale: {itemsOnSale}</Text>
    </View>
  </TouchableOpacity>
);

function Home() {
  const handleTrackerPress = () => {
    console.log("Navigating to GroceryTracker");
  };

  const handlePromotionPress = (title) => {
    console.log("Viewing promotion:", title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GroceryGrabber</Text>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Santosh,</Text>
        <View style={styles.savingsContainer}>
          <FoodSaved amount="3.3" />
          <MoneySaved amount="30" />
        </View>
        <Text style={styles.expiringText}>Food Expiring Soon:</Text>
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.6 }}>
              <Text style={styles.expiryFont}>Item</Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text style={styles.expiryFont}>Days Left</Text>
            </View>
            <View style={{ flex: 0.2, alignItems: "flex-end" }}>
              <Text style={styles.expiryFont}>Used</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.2 }}>
          <FlatList
            data={ITEMS}
            renderItem={({ item }) => (
              <Item
                itemName={item.itemName}
                daysLeft={item.daysLeft}
                used={item.used}
              />
            )}
            keyExtractor={(item) => item.id}
            persistentScrollbar={true}
          />
        </View>
        <TouchableOpacity onPress={handleTrackerPress}>
          <Text style={styles.trackerText}>Go to GroceryTracker &gt;&gt;</Text>
        </TouchableOpacity>
        <Text style={styles.promotionsText}>Promotions:</Text>
        <View style={{ flex: 0.7 }}>
          <FlatList
            data={PROMOS}
            renderItem={({ item }) => (
              <Promo
                name={item.name}
                location={item.location}
                itemsOnSale={item.itemsOnSale}
                image={item.image}
              />
            )}
            keyExtractor={(item) => item.id}
            persistentScrollbar={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
    backgroundColor: "white",
    alignSelf: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    width: "100%",
    backgroundColor: "#619f75",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  welcomeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
  },
  savingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  savingsBox: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: "#619f75",
    marginHorizontal: 4,
    borderRadius: 10,
  },
  savingsText: {
    fontSize: 32,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  savingsLabel: {
    marginTop: 8,
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  expiringText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#72a086",
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
    color: "green",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  promotionsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#72a086",
    textAlign: "left",
    marginTop: 20,
  },
  promotionBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
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
});

export default Home;
