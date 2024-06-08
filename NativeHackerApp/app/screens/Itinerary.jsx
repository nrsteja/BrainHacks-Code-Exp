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
import Header from "../general components/header";
import Filter from "../general components/Filter";
import COLORS from "../constants/colors"

const hardcodedItems = [
  { name: "White Bread", dateBought: 1, daysLeft: "3 days" },
  { name: "Eggs", dateBought: 12, daysLeft: "10 days" },
  { name: "Almonds", dateBought: 1, daysLeft: "2 weeks" },
  { name: "Spinach", dateBought: 1, daysLeft: "5 days" },
  { name: "Cabbage", dateBought: 2, daysLeft: "5 days" },
  { name: "Bananas", dateBought: 6, daysLeft: "2 days" },
  { name: "Fresh Orange Juice", dateBought: 2, daysLeft: "14 days" },
  { name: "Milk", dateBought: 3, daysLeft: "7 days" },
];

const hardcodedFilters = [
  { label: "All", value: "all" },
  { label: "Expiring Soon", value: "expiringSoon" },
  { label: "Fresh", value: "fresh" },
];

function Itinerary() {
  const [items, setItems] = useState(hardcodedItems);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [editMode, setEditMode] = useState(false);
  const [markedForDeletion, setMarkedForDeletion] = useState([]);
  const [editedItems, setEditedItems] = useState([...hardcodedItems]);

  const handleEditPress = () => {
    setEditMode(!editMode);
    setMarkedForDeletion([]); // Reset the marked for deletion list when toggling edit mode
    setEditedItems([...items]); // Set edited items to current items when entering edit mode
  };

  const handleSavePress = () => {
    // Perform save operation
    const newItems = editedItems.filter(
      (item, index) => !markedForDeletion.includes(index)
    );
    setItems(newItems);
    setEditMode(false);
    setMarkedForDeletion([]); // Clear marked items after saving
    setEditedItems(newItems); // Update edited items to the new saved items
  };

  const handleCancelPress = () => {
    setEditMode(false);
    setMarkedForDeletion([]); // Clear marked items on cancel
    setEditedItems([...items]); // Reset edited items on cancel
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

  const handleDeletePress = (index) => {
    if (markedForDeletion.includes(index)) {
      setMarkedForDeletion(markedForDeletion.filter((i) => i !== index));
    } else {
      setMarkedForDeletion([...markedForDeletion, index]);
    }
  };

  const handleIncreaseQuantity = (index) => {
    const newItems = [...editedItems];
    newItems[index].dateBought += 1;
    setEditedItems(newItems);
  };

  const handleDecreaseQuantity = (index) => {
    const newItems = [...editedItems];
    if (newItems[index].dateBought > 1) {
      newItems[index].dateBought -= 1;
      setEditedItems(newItems);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      width: "100%",
      alignSelf: "center",
      paddingBottom: 100, // Ensure there is space for the footer
    },
    searchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "2%",
      marginTop: "5%",
      marginVertical: "1.5%",
      width: "100%",
      backgroundColor: COLORS.dark_green,
      alignSelf: "center",
      maxWidth: "80%",
      borderRadius: "50%",
    },
    searchText: {
      fontSize: 18,
      color: COLORS.white,
    },
    listContainer: {
      flex: 0.8,
      paddingHorizontal: 10,
      width: "100%",
    },
    itemsHeaderText: {
      fontSize: 20,
      fontWeight: "bold",
      color: COLORS.dark_green,
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
      alignItems: "center",
    },
    itemFlex: {
      flex: 1,
      paddingVertical: 5,
      alignItems: "center",
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
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingBottom: 20,
      zIndex: 10,
      backgroundColor: "transparent",
      bottom: "11%",
    },
    editButton: {
      justifyContent: "center",
      paddingHorizontal: "8%",
      paddingVertical: "3%",
      backgroundColor: COLORS.dark_green,
      borderRadius: "50%",
    },
    editButtonText: {
      fontSize: 20,
      color: COLORS.white,
      textAlign: "center",
    },
    addButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.dark_green,
      borderRadius: 35,
      height: 70,
      width: 70,
    },
    addButtonText: {
      fontSize: 30,
      color: COLORS.white,
      textAlign: "center",
    },
    editButtonsContainer: {
      width: "50%",
      flexDirection: "row",
      position: "absolute",
      bottom: "90%",
      zIndex: 1,
    },
    saveButton: {
      paddingVertical: "4%",
      backgroundColor: COLORS.blue,
      marginHorizontal: 10,
      left: "40%",
    },
    cancelButton: {
      paddingHorizontal: "10%",
      backgroundColor: COLORS.red,
      marginHorizontal: 10,
      bottom: "-30%",
      right: "-32%",
    },
    deleteIcon: {
      color: COLORS.red,
    },
    dullText: {
      color: COLORS.grey,
    },
    quantityButtons: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    quantityButton: {
      marginHorizontal: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    quantityButtonText: {
      fontSize: 18,
    },
    quantityButtonIncrease: {
      backgroundColor: COLORS.dark_green,
    },
    quantityButtonDecrease: {
      backgroundColor: COLORS.red,
    },
    quantityButtonTextIncrease: {
      color: COLORS.white,
    },
    quantityButtonTextDecrease: {
      color: COLORS.white,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>Search for your grocery</Text>
        <Image
          style={{ width: 32, height: 32, marginRight: 10 }}
          source={require("./../../assets/search-icon.png")}
        />
      </View>
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
        {editedItems.map((item, index) => (
          <View key={index} style={styles.flexRow}>
            <View style={styles.itemFlex}>
              <Text
                style={[
                  styles.itemText,
                  markedForDeletion.includes(index) && styles.dullText,
                ]}
              >
                {item.name}
              </Text>
            </View>
            <View style={styles.itemFlex}>
              {editMode ? (
                <View style={styles.quantityButtons}>
                  <TouchableOpacity
                    style={[
                      styles.quantityButton,
                      styles.quantityButtonDecrease,
                    ]}
                    onPress={() => handleDecreaseQuantity(index)}
                  >
                    <Text style={styles.quantityButtonTextDecrease}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.boughtText}>{item.dateBought}</Text>
                  <TouchableOpacity
                    style={[
                      styles.quantityButton,
                      styles.quantityButtonIncrease,
                    ]}
                    onPress={() => handleIncreaseQuantity(index)}
                  >
                    <Text style={styles.quantityButtonTextIncrease}>+</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.boughtText}>{item.dateBought}</Text>
              )}
            </View>
            <View style={styles.itemFlex}>
              <Text
                style={[
                  styles.expiringText,
                  markedForDeletion.includes(index) && styles.dullText,
                ]}
              >
                {item.daysLeft}
              </Text>
            </View>
            {editMode && (
              <TouchableOpacity onPress={() => handleDeletePress(index)}>
                <FontAwesome
                  name="trash"
                  size={24}
                  style={[
                    styles.deleteIcon,
                    markedForDeletion.includes(index) && styles.dullText,
                  ]}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <SafeAreaView style={styles.footer}>
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
          <FontAwesome name="camera" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default Itinerary;
