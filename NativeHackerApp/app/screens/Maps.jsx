import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import Header from "../general components/header";
import Filter from "../general components/Filter";
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../constants/colors"

const hardcodedFilters = [
  { label: "All", value: "all" },
  { label: "Radius", value: "radius" },
  { label: "Shops", value: "shops" },
];

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

const Maps2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  return (
    <View style={styles.headerContainer}>
      <Header />
      <Filter
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
      {isDropdownOpen && (
        <DropDownPicker
          open={isDropdownOpen}
          items={hardcodedFilters}
          setOpen={setIsDropdownOpen}
          value={selectedFilter}
          setValue={setSelectedFilter}
          onSelectItem={(item) => console.log(item)}
        />
      )}
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/4fa9f970bf792cd3caa8aac404b0d28afd2a78e3e26a7e0863f936e307aad46e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
        }}
        style={styles.headerImage}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>GroceryGrabber</Text>
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
      <Maps2 />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.dark_green,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
  },
  filterButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //paddingHorizontal: 16,
    //paddingVertical: 8,
    //marginTop: 12,
    backgroundColor: COLORS.dark_green,
    borderRadius: 30,
    alignSelf: "center",
    //marginBottom: 476,
  },
  filterText: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center",
  },
  expandMore: {
    fontSize: 14,
    color: COLORS.grey,
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
