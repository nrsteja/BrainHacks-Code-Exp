import * as React from "react";
import { USERLIST } from "./Lists";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Platform,
  StyleSheet,
  Dimensions,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors";
import Header from "../general components/header";
import { PROMOS, ITEMS } from "./Lists";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { SupermarketsContext } from "./MapContext";
import { useContext } from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const getFontFamily = () => {
  if (Platform.OS === "ios") {
    return "Avenir-Book";
  } else if (Platform.OS === "android") {
    return "sans-serif";
  }
  return "System";
};

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

export const Item = ({ name, daysLeft, quantity }) => (
  <View>
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <View style={{ flex: 0.5 }}>
        <Text style={styles.itemsFont}>{name}</Text>
      </View>
      <View style={{ flex: 0.4, alignItems: "center" }}>
        <Text style={styles.itemsFont}>{daysLeft}</Text>
      </View>
      <View style={{ flex: 0.1, alignItems: "center" }}>
        <Text style={styles.itemsFont}>{quantity}</Text>
      </View>
    </View>
  </View>
);

export const Promo = ({ name, location, itemsOnSale, onPress }) => (
  <TouchableOpacity style={styles.promotionBox} onPress={onPress}>
    <FontAwesome5
      name="store"
      size={0.04 * height}
      style={{ paddingRight: 0.02 * width }}
      color={COLORS.brown}
    />
    <View style={styles.promotionDetails}>
      <Text style={styles.promotionTitle}>{name}</Text>
      <Text style={styles.promotionSubtitle}>{location}</Text>
      <Text style={styles.promotionItems}>Items On Sale: {itemsOnSale}</Text>
    </View>
  </TouchableOpacity>
);
const getUserAmount = (email) => {
  const user = USERLIST.find((user) => user.email === email);
  return user ? user.amount : 0; // Assuming 'amount' is a property in the user object
};

const getUserWeight = (email) => {
  const user = USERLIST.find((user) => user.email === email);
  return user ? user.weight : 0; // Assuming 'weight' is a property in the user object
};

const getUserName = (email) => {
  const user = USERLIST.find((user) => user.email === email);
  return user ? user.name : "";
};

function Home() {
  const navigation = useNavigation();
  const { inventory } = useContext(SupermarketsContext);
  const { loggedInUser } = useContext(SupermarketsContext);
  const filteredInventory = inventory.filter((item) => item.daysLeftNumber < 5);

  const handleTrackerPress = () => {
    console.log("Navigating to GroceryTracker");
    navigation.navigate("Itinerary");
  };

  const amount = loggedInUser ? getUserAmount(loggedInUser.email) : 50;
  const weight = loggedInUser ? getUserWeight(loggedInUser.email) : 16;
  const name = loggedInUser ? getUserName(loggedInUser.email) : "";

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Grabber 👋 </Text>
        <View style={styles.savingsContainer}>
          <FoodSaved amount={weight} />
          <MoneySaved amount={amount} />
        </View>
        <Text style={styles.expiringText}>Food Expiring Soon:</Text>
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.expiryFont}>Item</Text>
            </View>
            <View style={{ flex: 0.4, alignItems: "center" }}>
              <Text style={styles.expiryFont}>Days Left</Text>
            </View>
            <View style={{ flex: 0.1, alignItems: "center" }}>
              <Text style={styles.expiryFont}>Qty.</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.2 }}>
          <FlatList
            data={filteredInventory}
            renderItem={({ item }) => (
              <Item
                name={item.name}
                daysLeft={item.daysLeft}
                quantity={item.quantity}
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
                onPress={() => navigation.navigate("ListItems")}
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
    backgroundColor: COLORS.white,
    alignSelf: "center",
  },
  welcomeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.dark_green,
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
    backgroundColor: COLORS.green,
    marginHorizontal: 4,
    borderRadius: 10,
  },
  savingsText: {
    fontSize: 32,
    fontWeight: "600",
    color: COLORS.white,
    textAlign: "center",
  },
  savingsLabel: {
    marginTop: 8,
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center",
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
});

export default Home;
