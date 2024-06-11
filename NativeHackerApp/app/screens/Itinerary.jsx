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
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "../general components/header";
import Filter from "../general components/Filter";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors";
import { generateEmojiForItem } from "../api/emoji";
import Icon from "react-native-vector-icons/FontAwesome";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const hardcodedItems = [
  {
    id: 1,
    name: "White Bread",
    quantity: 1,
    daysLeft: "3 days",
    daysLeftNumber: 3,
    emoji: "🍞",
  },
  {
    id: 2,
    name: "Eggs",
    quantity: 12,
    daysLeft: "10 days",
    daysLeftNumber: 10,
    emoji: "🥚",
  },
  {
    id: 3,
    name: "Almonds",
    quantity: 1,
    daysLeft: "14 days",
    daysLeftNumber: 14,
    emoji: "🌰",
  },
  {
    id: 4,
    name: "Spinach",
    quantity: 1,
    daysLeft: "5 days",
    daysLeftNumber: 5,
    emoji: "🌿",
  },
  {
    id: 5,
    name: "Cabbage",
    quantity: 2,
    daysLeft: "5 days",
    daysLeftNumber: 5,
    emoji: "🥬",
  },
  {
    id: 6,
    name: "Bananas",
    quantity: 6,
    daysLeft: "2 days",
    daysLeftNumber: 2,
    emoji: "🍌",
  },
  {
    id: 7,
    name: "Fresh Orange Juice",
    quantity: 2,
    daysLeft: "14 days",
    daysLeftNumber: 14,
    emoji: "🧃",
  },
  {
    id: 8,
    name: "Milk",
    quantity: 3,
    daysLeft: "7 days",
    daysLeftNumber: 7,
    emoji: "🥛",
  },
]

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
  const [searchTerm, setSearchTerm] = useState("");

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
  const Filter = ({
    label,
    filters,
    selectedFilter,
    setSelectedFilter,
    isDropdownOpen,
    setIsDropdownOpen,
  }) => {
    return (
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>{label}</Text>
        <TouchableOpacity
          style={[
            styles.filterButton,
            isDropdownOpen && styles.filterButtonOpen,
          ]}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Text style={styles.filterButtonText}>
            {filters.find((filter) => filter.value === selectedFilter)?.label}
          </Text>
          <Ionicons
            name={isDropdownOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleEditPress = () => {
    console.log("pressed");
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

  const handleManualAddPress = () => {
    setShowManualAddModal(!showManualAddModal);
  };

  // const handleDeletePress = (index) => {
  //   if (markedForDeletion.includes(index)) {
  //     setMarkedForDeletion(markedForDeletion.filter((i) => i !== index));
  //   } else {
  //     setMarkedForDeletion([...markedForDeletion, index]);
  //   }
  // };

  // const handleIncreaseQuantity = (index) => {
  //   const newItems = [...editedItems];
  //   newItems[index].quantity += 1;
  //   setEditedItems(newItems);
  // };

  // const handleDecreaseQuantity = (index) => {
  //   const newItems = [...editedItems];
  //   if (newItems[index].quantity > 1) {
  //     newItems[index].quantity -= 1;
  //     setEditedItems(newItems);
  //   }
  // };
  const handleDeletePress = (id) => {
    if (markedForDeletion.includes(id)) {
      setMarkedForDeletion(markedForDeletion.filter((itemId) => itemId !== id));
    } else {
      setMarkedForDeletion([...markedForDeletion, id]);
    }
  };
  const handleIncreaseQuantity = (id) => {
    const newItems = [...editedItems];
    const itemIndex = newItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      newItems[itemIndex].quantity += 1;
      setEditedItems(newItems);
    }
  };

  const handleDecreaseQuantity = (id) => {
    const newItems = [...editedItems];
    const itemIndex = newItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1 && newItems[itemIndex].quantity > 1) {
      newItems[itemIndex].quantity -= 1;
      setEditedItems(newItems);
    }
  };

  const handleAddNewItem = async () => {
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

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const filteredItems = editedItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // All fields are filled, proceed with adding the new item
    const newItem = {
      name: newItemName,
      quantity: parseInt(newItemQuantity),
      daysLeft: `${newItemDaysLeft} days`,
      daysLeftNumber: parseInt(newItemDaysLeft),
      emoji: await generateEmojiForItem(newItemName),
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
      filteredItems.sort((a, b) => b.quantity - a.quantity);
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
      position: "absolute",
      paddingHorizontal: "8%",
      paddingVertical: "3%",
      backgroundColor: COLORS.green,
      borderRadius: "50%",
      bottom: "3%",
      zIndex: 1,
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

    saveButton: {
      backgroundColor: "blue",
      justifyContent: "center",
      position: "absolute",
      alignItems: "center",
      width: 0.06 * height,
      height: 0.06 * height,
      borderRadius: 100,
      left: 0.01 * width,
      bottom: 0.08 * height,
    },
    cancelButton: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      width: 0.06 * height,
      height: 0.06 * height,
      borderRadius: 100,
      backgroundColor: "red",
      left: 0.17 * width,
      bottom: 0.01 * height,
    },
    addOptionButton: {
      backgroundColor: "blue",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      width: 0.06 * height,
      height: 0.06 * height,
      borderRadius: 100,
      //marginBottom: "15%",
      right: 0.17 * width,
      bottom: 0.01 * height,
    },
    cameraOptionButton: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      width: 0.06 * height,
      height: 0.06 * height,
      borderRadius: 100,
      backgroundColor: "red",
      right: 0.01 * width,
      bottom: 0.08 * height,
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
    quantityButtonIncrease: {
      backgroundColor: "green",
    },
    quantityButtonDecrease: {
      backgroundColor: "red",
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
    card: {
      backgroundColor: "#f8f9fa",
      borderRadius: 15,
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    itemDetails: {
      flexDirection: "row",
      alignItems: "center",
    },
    itemEmoji: {
      fontSize: 30,
      marginRight: 15,
    },
    itemInfo: {
      flex: 1,
    },
    itemText: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },

    expiryText: {
      fontSize: 16,
      color: "#6c757d",
    },
    editOptions: {
      flexDirection: "column",
      alignItems: "flex-end",
    },
    quantityButtons: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    quantityButton: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      height: 40,
      width: 40,
      margin: 5,
    },
    quantityButtonText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
    quantityButtonIncrease: {
      backgroundColor: "#28a745",
    },
    quantityButtonDecrease: {
      backgroundColor: "#dc3545",
    },
    quantity: {
      fontSize: 18,
      marginHorizontal: 10,
    },
    marginHorizontal: {
      marginHorizontal: 15, // assuming you meant marginHorizontal style
    },
    quantityText: {
      fontSize: 16,
      color: "#6c757d",
      marginBottom: 5,
    },
    editOptions: {
      flexDirection: "row",
      alignItems: "center", // ensures vertical alignment
    },
    marginHorizontal: {
      marginHorizontal: 15, // assuming you meant marginHorizontal style
    },
    quantityText: {
      fontSize: 16,
      color: "#6c757d",
      marginBottom: 5,
    },
    editOptions: {
      flexDirection: "row",
      alignItems: "center", // ensures vertical alignment
    },
    quantityButtons: {
      flexDirection: "row",
      alignItems: "center", // ensures vertical alignment
      marginRight: 10,
    },
    quantityButton: {
      borderWidth: 1,
      borderColor: "#000",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginHorizontal: 2,
    },
    controlButton: {
      padding: 5,
    },
    dullText: {
      color: "gray",
    },
    quantityTextBetween: {
      marginHorizontal: 10,
      fontSize: 16,
    },
    editButtonsContainer: {
      //width: "50%",
      //flexDirection: "row",
      position: "absolute",
      bottom: 5,
      left: 10,
      alignItems: "flex-end",
      borderWidth: 2,
      zIndex: 1,
    },
    controlsContainer: {
      marginBottom: 0.06 * height,

      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "white",
      zIndex: 10,
    },
    smallButton: {
      backgroundColor: "transparent",
      justifyContent: "center",
      paddingHorizontal: 10,
      borderRadius: 30,
      marginHorizontal: 10,
      zIndex: 11,
    },
    filterContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      backgroundColor: COLORS.green,
      borderRadius: 10,
      marginHorizontal: 20,
      marginVertical: 10,
    },
    filterLabel: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    filterButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.green,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      transition: "all 0.3s ease",
    },
    filterButtonOpen: {
      backgroundColor: COLORS.darkGreen,
      borderColor: COLORS.darkGreen,
    },
    filterButtonText: {
      color: "white",
      fontSize: 16,
      marginRight: 5,
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
        {filteredItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemEmoji}>{item.emoji}</Text>
              <View style={styles.itemInfo}>
                <Text
                  style={[
                    styles.itemText,
                    markedForDeletion.includes(item.id) && styles.dullText,
                  ]}
                >
                  {item.name}
                </Text>
                <Text style={styles.quantityText}>
                  Quantity: {item.quantity}
                </Text>
                <Text
                  style={[
                    styles.expiryText,
                    markedForDeletion.includes(item.id) && styles.dullText,
                  ]}
                >
                  Expires in: {item.daysLeft}
                </Text>
              </View>
              {editMode && (
                <View style={styles.editOptions}>
                  <View style={styles.quantityButtons}>
                    <TouchableOpacity
                      style={[styles.controlButton]}
                      onPress={() => handleDecreaseQuantity(item.id)}
                    >
                      <FontAwesome name="minus" size={16} color="red" />
                    </TouchableOpacity>
                    <Text style={styles.quantityTextBetween}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      style={[styles.controlButton]}
                      onPress={() => handleIncreaseQuantity(item.id)}
                    >
                      <FontAwesome name="plus" size={16} color="green" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => handleDeletePress(item.id)}>
                    <FontAwesome
                      name="trash"
                      size={24}
                      style={[
                        styles.deleteIcon,
                        markedForDeletion.includes(item.id) && styles.dullText,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={handleEditPress}
          style={[styles.smallButton]}
        >
          <FontAwesome name="edit" size={35} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddPress} style={styles.smallButton}>
          <Ionicons name="add-circle" size={50} color="green" />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.footer}>
        {editMode && (
          <View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSavePress}
            >
              <FontAwesome name="save" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelPress}
            >
              <FontAwesome name="times" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {showAddOptions && (
          <View>
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
              <FontAwesome name="cart-plus" size={30} color="white" />
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
