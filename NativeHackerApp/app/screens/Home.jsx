import * as React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";

function Home() {
  const handleTrackerPress = () => {
    console.log("Navigating to GroceryTracker");
  };

  const handlePromotionPress = (title) => {
    console.log("Viewing promotion:", title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GroceryGrabber</Text>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Santosh,</Text>
        <View style={styles.savingsContainer}>
          <View style={styles.savingsBox}>
            <Text style={styles.savingsText}>3.3 kg</Text>
            <Text style={styles.savingsLabel}>of food saved </Text>
          </View>
          <View style={styles.savingsBox}>
            <Text style={styles.savingsText}>$ 30</Text>
            <Text style={styles.savingsLabel}>of money saved</Text>
          </View>
        </View>
        <Text style={styles.expiringText}>Food Expiring Soon:</Text>
        <View style={styles.expiringContainer}>
          <View style={styles.expiringItems}>
            <Text style={styles.expiringTitle}>Item</Text>
            <Text style={styles.expiringName}>White Bread</Text>
            <Text style={styles.expiringName}>Spinach</Text>
            <Text style={styles.expiringName}>Milk - Gardenia</Text>
          </View>
          <View style={styles.daysContainer}>
            <View style={styles.expiringDays}>
              <Text style={styles.expiringTitle}>Days Left</Text>
              <Text style={styles.daysCount}>3</Text>
            </View>
            <View style={styles.expiringUsed}>
              <Text style={styles.expiringTitle}>Used</Text>
              <View style={styles.usedBox} />
            </View>
          </View>
          <View style={styles.daysContainer}>
            <View style={styles.expiringDays}>
              <Text style={styles.expiringTitle}>Days Left</Text>
              <Text style={styles.daysCount}>1</Text>
            </View>
            <View style={styles.expiringUsed}>
              <Text style={styles.expiringTitle}>Used</Text>
              <View style={styles.usedBox} />
            </View>
          </View>
          <View style={styles.daysContainer}>
            <View style={styles.expiringDays}>
              <Text style={styles.expiringTitle}>Days Left</Text>
              <Text style={styles.daysCount}>4</Text>
            </View>
            <View style={styles.expiringUsed}>
              <Text style={styles.expiringTitle}>Used</Text>
              <View style={styles.usedBox} />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleTrackerPress}>
          <Text style={styles.trackerText}>Go to GroceryTracker &gt;&gt;</Text>
        </TouchableOpacity>
        <Text style={styles.promotionsText}>Promotions:</Text>
        <TouchableOpacity
          style={styles.promotionBox}
          onPress={() => handlePromotionPress("Fairprice at Kampung Admiralty")}
        >
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/233402a655fce3616d5404a84b9c5cfa3816ca29d7f7e9f57002b53e34d3e79f?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
            }}
            style={styles.promotionImage}
          />
          <View style={styles.promotionDetails}>
            <Text style={styles.promotionTitle}>Fairprice</Text>
            <Text style={styles.promotionSubtitle}>Kampung Admiralty</Text>
            <Text style={styles.promotionItems}>Items on sale: 11</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.promotionBox}
          onPress={() => handlePromotionPress("Cold Storage at Causeway Point")}
        >
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/c03b51cecc85bf286bcb805b286071226ee009e347f7e995a30b085156157c0e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
            }}
            style={styles.promotionImage}
          />
          <View style={styles.promotionDetails}>
            <Text style={styles.promotionTitle}>Cold Storage</Text>
            <Text style={styles.promotionSubtitle}>Causeway Point</Text>
            <Text style={styles.promotionItems}>Items on sale: 2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.promotionBox}
          onPress={() => handlePromotionPress("Giant at Admiralty MRT")}
        >
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/c63809a49994ae4e0643f0535a928d4afa6deda515c329258fc88bcd34fb7e4e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
            }}
            style={styles.promotionImage}
          />
          <View style={styles.promotionDetails}>
            <Text style={styles.promotionTitle}>Giant</Text>
            <Text style={styles.promotionSubtitle}>Admiralty MRT</Text>
            <Text style={styles.promotionItems}>Items on sale: 4</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/a2560a352ed081d1c2e9b90e30a82619dc414e91dde682cd41cd56dfad91fde9?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
        }}
        style={styles.promotionBanner}
      />
    </View>
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
    backgroundColor: "grey",
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
    backgroundColor: "grey",
    marginHorizontal: 4,
  },
  savingsText: {
    fontSize: 32,
    color: "white",
  },
  savingsLabel: {
    marginTop: 8,
    fontSize: 18,
    color: "white",
  },
  expiringText: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  expiringContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  expiringItems: {
    flex: 1,
    alignItems: "flex-start",
  },
  expiringTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expiringName: {
    marginTop: 4,
    fontSize: 16,
  },
  daysContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  expiringDays: {
    flexDirection: "column",
    alignItems: "center",
  },
  daysCount: {
    marginTop: 16,
    fontSize: 16,
  },
  expiringUsed: {
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "bold",
  },
  usedBox: {
    marginTop: 8,
    width: 20,
    height: 20,
    borderColor: "grey",
    borderWidth: 3,
  },
  trackerText: {
    marginTop: 24,
    fontSize: 14,
    fontWeight: "bold",
    color: "grey",
  },
  promotionsText: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  promotionBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: "grey",
  },
  promotionImage: {
    width: 106,
    aspectRatio: 1.2,
  },
  promotionDetails: {
    flex: 1,
    marginLeft: 8,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  promotionSubtitle: {
    fontSize: 14,
  },
  promotionItems: {
    marginTop: 8,
    fontSize: 14,
  },
  promotionBanner: {
    marginTop: 8,
    width: "100%",
    aspectRatio: 4.55,
    borderColor: "grey",
    borderWidth: 2,
  },
});

export default Home;
