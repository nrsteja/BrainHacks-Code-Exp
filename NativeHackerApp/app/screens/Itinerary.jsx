import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";

const hardcodedItems = [
  { name: "White Bread", dateBought: "1", daysLeft: "3 days" },
  { name: "Eggs", dateBought: "12", daysLeft: "10 days" },
  { name: "Almonds", dateBought: "1", daysLeft: "2 weeks" },
  { name: "Spinach", dateBought: "1", daysLeft: "5 days" },
  { name: "Cabbage", dateBought: "2", daysLeft: "5 days" },
  { name: "Bananas", dateBought: "6", daysLeft: "2 days" },
  { name: "Fresh Orange Juice", dateBought: "2", daysLeft: "14 days" },
  { name: "Milk", dateBought: "3", daysLeft: "7 days" },
];

const hardcodedFilters = [
  { label: "All", value: "all" },
  { label: "Expiring Soon", value: "expiringSoon" },
  { label: "Fresh", value: "fresh" },
];

function Itinerary() {
  const [items] = useState(hardcodedItems);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [editMode, setEditMode] = useState(false);

  const handleEditPress = () => {
    setEditMode(!editMode);
  };

  const handleSavePress = () => {
    // Perform save operation
    setEditMode(false);
  };

  const handleCancelPress = () => {
    setEditMode(false);
  };

  const handleAddPress = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      Alert.alert(
        "Add Item",
        "Choose an option",
        [
          {
            text: "Camera",
            onPress: async () => {
              const image = await ImagePicker.launchCameraAsync();
              console.log("Image captured", image);
            },
          },
          {
            text: "Gallery",
            onPress: async () => {
              const image = await ImagePicker.launchImageLibraryAsync();
              console.log("Image selected from gallery", image);
            },
          },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert("Permission Denied", "Camera permission is required!");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      width: "100%",
      alignSelf: "center",
    },
    header: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center",
      //paddingHorizontal: 16,
      //paddingVertical: 4,
      backgroundColor: "green",
      textAlign: "center",
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
    searchContainer: {
      flex: 0.1,
      borderWidth: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      width: "100%",
      marginTop: 12,
      backgroundColor: "green",
      alignSelf: "center",
      maxWidth: "80%",
    },
    searchText: {
      fontSize: 18,
      color: "white",
    },
    filterButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginTop: 12,
      backgroundColor: "green",
      borderRadius: 15,
      alignSelf: "center",
    },
    filterText: {
      fontSize: 16,
      color: "white",
      textAlign: "center",
    },
    listContainer: {
      flex: 0.8,
      paddingHorizontal: 10,
      width: "100%",
    },
    itemsHeaderText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "green",
      marginVertical: "5%",
      textAlign: "center",
    },
    itemText: {
      fontSize: 18,
      marginVertical: "5%",
      textAlign: "center",
    },
    flexRow: {
      flexDirection: "row",
    },
    itemFlex: {
      flex: 1,
      paddingVertical: 5,
    },
    boughtText: {
      fontSize: 18,
      textAlign: "center",
      marginVertical: "5%",
    },
    expiringText: {
      fontSize: 18,
      textAlign: "center",
      marginVertical: "5%",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    editButton: {
      justifyContent: "center",
      paddingHorizontal: 32,
      paddingVertical: 16,
      backgroundColor: "green",
      borderRadius: 15,
    },
    editButtonText: {
      fontSize: 20,
      color: "white",
      textAlign: "center",
    },
    addButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "green",
      borderRadius: 35,
      height: 70,
      width: 70,
    },
    addButtonText: {
      fontSize: 30,
      color: "white",
      textAlign: "center",
    },
    editButtonsContainer: {
      position: "absolute",
      top: -60,
      left: 0,
      flexDirection: "column",
      alignItems: "center",
      zIndex: 1,
      //borderWidth: 5,
    },
    saveButton: {
      backgroundColor: "blue",
      left: "-5%",
    },
    cancelButton: {
      backgroundColor: "red",
      left: "85%",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GroceryGrabber</Text>
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>Search for your grocery</Text>
        <Image
          style={{ width: 36, height: 36 }}
          source={{ uri: "https://via.placeholder.com/36" }}
        />
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Text style={styles.filterText}>Filters</Text>
        <FontAwesome
          name={isDropdownOpen ? "chevron-up" : "chevron-down"}
          size={16}
          color="white"
        />
      </TouchableOpacity>
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
      <ScrollView style={styles.listContainer}>
        <View style={styles.flexRow}>
          <View style={styles.itemFlex}>
            <Text style={styles.itemsHeaderText}>Item</Text>
          </View>
          <View style={styles.itemFlex}>
            <Text style={styles.itemsHeaderText}>Quantity</Text>
          </View>
          <View style={styles.itemFlex}>
            <Text style={styles.itemsHeaderText}>Expiry</Text>
          </View>
        </View>
        {items.map((item, index) => (
          <View key={index} style={styles.flexRow}>
            <View style={styles.itemFlex}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
            <View style={styles.itemFlex}>
              <Text style={styles.boughtText}>{item.dateBought}</Text>
            </View>
            <View style={styles.itemFlex}>
              <Text style={styles.expiringText}>{item.daysLeft}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        {editMode && (
          <View style={styles.editButtonsContainer}>
            <TouchableOpacity
              style={[styles.editButton, styles.saveButton]}
              onPress={handleSavePress}
            >
              <Text style={styles.editButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editButton, styles.cancelButton]}
              onPress={handleCancelPress}
            >
              <Text style={styles.editButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>{"Edit"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <FontAwesome name="camera" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Itinerary;
