import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";

function handleFilterPress() {
  Alert.alert("Filters button pressed!");
}

function handleHomePress() {
  Alert.alert("Home button pressed!");
}

function handleSearchPress() {
  Alert.alert("Search button pressed!");
}

function handleProfilePress() {
  Alert.alert("Profile button pressed!");
}

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/4fa9f970bf792cd3caa8aac404b0d28afd2a78e3e26a7e0863f936e307aad46e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
        }}
        style={styles.headerImage}
      />
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>GroceryGrabber</Text>
      </View>
      <TouchableOpacity onPress={handleFilterPress} style={styles.filterButton}>
        <Text style={styles.filterText}>Filters</Text>
        <Text style={styles.expandMore}>expand_more</Text>
      </TouchableOpacity>
    </View>
  );
};

const Maps = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignSelf: "center",
  },
  headerContainer: {
    flex: 1,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 0.49,
  },
  headerTitleContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: "1%",
    width: "100%",
    backgroundColor: "green",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  filterButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
    backgroundColor: "rgba(128, 128, 128, 0.8)",
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: 476,
  },
  filterText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  expandMore: {
    fontSize: 14,
    color: "#D1D1D1",
    marginLeft: 8,
  },
  bannerImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 5.56,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  iconButton: {
    padding: 10,
  },
  iconText: {
    fontSize: 24,
    color: "#000",
  },
});

export default Maps;
