import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "../general components/header";
import Filter from "../general components/Filter";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const hardcodedItems = [
  { name: "White Bread", dateBought: 1, daysLeft: "3 days", daysLeftNumber: 3 },
  { name: "Eggs", dateBought: 12, daysLeft: "10 days", daysLeftNumber: 10 },
  { name: "Almonds", dateBought: 1, daysLeft: "14 days", daysLeftNumber: 14 },
  { name: "Spinach", dateBought: 1, daysLeft: "5 days", daysLeftNumber: 5 },
  { name: "Cabbage", dateBought: 2, daysLeft: "5 days", daysLeftNumber: 5 },
  { name: "Bananas", dateBought: 6, daysLeft: "2 days", daysLeftNumber: 2 },
  {
    name: "Fresh Orange Juice",
    dateBought: 2,
    daysLeft: "14 days",
    daysLeftNumber: 14,
  },
  { name: "Milk", dateBought: 3, daysLeft: "7 days", daysLeftNumber: 7 },
];

const hardcodedFilters = [
  { label: "All", value: "all" },
  { label: "Expiring Soon", value: "expiringSoon" },
  { label: "Quantity Wise", value: "quantityWise" },
];

function Itinerary() {
  const navigation = useNavigation();
  const [items, setItems] = useState(hardcodedItems);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [editMode, setEditMode] = useState(false);
  const [markedForDeletion, setMarkedForDeletion] = useState([]);
  const [editedItems, setEditedItems] = useState([...hardcodedItems]);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showManualAddModal, setShowManualAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemDaysLeft, setNewItemDaysLeft] = useState("");
  const [itemNameError, setItemNameError] = useState("");
  const [itemQuantityError, setItemQuantityError] = useState("");
  const [itemDaysLeftError, setItemDaysLeftError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([...items]);

  useEffect(() => {
    setFilteredItems(getFilteredItems());
  }, [searchQuery, selectedFilter, items]);

  const filterItems = () => {
    if (searchQuery.trim() === "") {
      return items;
    } else {
      return items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  const handleEditPress = () => {
    setEditMode(!editMode);
    if (showAddOptions) {
      setShowAddOptions(false);
    }
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

  const handleAddPress = () => {
    if (editMode) {
      setEditMode(false);
    }
    setShowAddOptions(!showAddOptions);
  };

  const handleCameraPress = async () => {
    navigation.navigate("CameraScreen");
    if (showAddOptions) {
      setShowAddOptions(false);
    }
    // const { status } = await Camera.requestPermissionsAsync();
    // if (status === "granted") {
    //   const image = await ImagePicker.launchCameraAsync();
    //   console.log("Image captured", image);
    // } else {
    //   Alert.alert("Permission Denied", "Camera permission is required!");
    // }
  };

  const handleGalleryPress = async () => {
    const image = await ImagePicker.launchImageLibraryAsync();
    console.log("Image selected from gallery", image);
  };

  const handleManualAddPress = () => {
    setShowManualAddModal(!showManualAddModal);
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

  const handleAddNewItem = () => {
    if (!newItemName) {
      setItemNameError("Item name is required");
      return;
    } else {
      setItemNameError("");
    }

    if (!newItemQuantity) {
      setItemQuantityError("Quantity is required");
      return;
    } else {
      setItemQuantityError("");
    }

    if (!newItemDaysLeft) {
      setItemDaysLeftError("Days left is required");
      return;
    } else {
      setItemDaysLeftError("");
    }

    // All fields are filled, proceed with adding the new item
    const newItem = {
      name: newItemName,
      dateBought: parseInt(newItemQuantity),
      daysLeft: `${newItemDaysLeft} days`,
      daysLeftNumber: parseInt(newItemDaysLeft),
    };
    setItems([...items, newItem]);
    setShowManualAddModal(false);
    setShowAddOptions(false);
    setNewItemName("");
    setNewItemQuantity("");
    setNewItemDaysLeft("");
  };

  const getFilteredItems = () => {
    let filteredItems = [...items];

    if (selectedFilter === "expiringSoon") {
      filteredItems.sort((a, b) => {
        const aDays = a.daysLeftNumber;
        const bDays = b.daysLeftNumber;
        return aDays - bDays;
      });
    } else if (selectedFilter === "quantityWise") {
      filteredItems.sort((a, b) => b.dateBought - a.dateBought);
    }

    return filteredItems;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      width: "100%",
      alignSelf: "center",
      paddingBottom: 100,
    },
    searchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: "5%",
      paddingVertical: "2%",
      marginTop: "5%",
      marginVertical: "1.5%",
      width: "100%",
      backgroundColor: COLORS.green,
      alignSelf: "center",
      maxWidth: "80%",
      borderRadius: "50%",
    },
    searchText: {
      fontSize: 18,
      color: "white",
    },
    listContainer: {
      flex: 0.8,
      paddingHorizontal: 10,
      width: "100%",
    },
    itemsHeaderText: {
      fontSize: 20,
      fontWeight: "bold",
      color: COLORS.green,
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
      backgroundColor: COLORS.green,
      borderRadius: "50%",
      bottom: "3%",
    },
    editButtonText: {
      fontSize: 20,
      color: "white",
      textAlign: "center",
    },
    addButton: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.green,
      borderRadius: 100,
      height: 0.07 * height,
      width: 0.07 * height,
      zIndex: 10,
      position: "absolute",
      bottom: 0.01 * height,
      right: 20,
    },
    addButtonText: {
      fontSize: 30,
      color: "white",
      textAlign: "center",
    },
    //--------Edit------------
    editButtonsContainer: {
      width: "50%",
      flexDirection: "row",
      position: "absolute",
      bottom: "90%",
      zIndex: 1,
    },
    saveButton: {
      paddingVertical: "5%",
      backgroundColor: "blue",
      marginHorizontal: "7%",
      left: "40%",
      bottom: "15%",
    },
    cancelButton: {
      paddingHorizontal: "6%",
      backgroundColor: "red",
      marginHorizontal: "15%",
      bottom: "-17%",
    },

    deleteIcon: {
      color: "red",
      marginHorizontal: 3,
    },
    dullText: {
      color: "gray",
    },
    quantityButtons: {
      flexDirection: "row",
      alignItems: "center",
    },
    quantityButton: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      height: 30,
      width: 30,
      margin: 7,
    },
    quantityButtonTextIncrease: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
    quantityButtonTextDecrease: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
    quantityButtonIncrease: {
      backgroundColor: "green",
    },
    quantityButtonDecrease: {
      backgroundColor: "red",
    },
    addOptionButton: {
      backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
      width: 0.06 * height,
      height: 0.06 * height,
      borderRadius: 100,
      //marginBottom: "15%",
      right: 0.18 * width,
      bottom: 0.01 * height
    },
    cameraOptionButton: {
      justifyContent: "center",
      alignItems: "center",
      width: 0.06 * height,
      height: 0.06 * height,
      borderRadius: 100,
      backgroundColor: "red",
      right: 0.01 * width,
      bottom: 0.025 * height
    },
    addOptionsContainer: {
      position: "absolute",
      bottom: 5,
      right: 20,
      alignItems: "flex-end",
    },

    searchBar: {
      backgroundColor: COLORS.green,
      padding: "4%",
      borderRadius: 20,
      margin: "5%",
    },

    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: "gray",
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
    errorText: {
      color: "red",
      marginTop: 5,
    },

    requiredField: {
      borderColor: "red",
      borderWidth: 1,
    },
    modalButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    modalButton: {
      backgroundColor: COLORS.green,
      padding: 10,
      borderRadius: 5,
    },
    modalButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search items"
          placeholderTextColor="white"
          style={styles.searchText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Filter
        label="Grocery Items"
        filters={hardcodedFilters}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
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
        {filteredItems
          .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item, index) => (
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
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        {showAddOptions && (
          <View style={styles.addOptionsContainer}>
            <TouchableOpacity
              style={styles.cameraOptionButton}
              onPress={handleCameraPress}
            >
              <FontAwesome name="camera" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addOptionButton}
              onPress={handleManualAddPress}
            >
              <FontAwesome name="plus" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
      <Modal
        visible={showManualAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowManualAddModal(false);
          setShowAddOptions(false); // Ensure that showAddOptions is set to false when the modal is closed
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Item</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Item Name"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            {itemNameError !== "" && (
              <Text style={styles.errorText}>{itemNameError}</Text>
            )}

            <TextInput
              style={styles.modalInput}
              placeholder="Quantity"
              value={newItemQuantity}
              onChangeText={setNewItemQuantity}
              keyboardType="numeric"
            />
            {itemQuantityError !== "" && (
              <Text style={styles.errorText}>{itemQuantityError}</Text>
            )}

            <TextInput
              style={styles.modalInput}
              placeholder="Days Left"
              value={newItemDaysLeft}
              onChangeText={setNewItemDaysLeft}
            />
            {itemDaysLeftError !== "" && (
              <Text style={styles.errorText}>{itemDaysLeftError}</Text>
            )}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleAddNewItem}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "red" }]}
                onPress={() => setShowManualAddModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Itinerary;
