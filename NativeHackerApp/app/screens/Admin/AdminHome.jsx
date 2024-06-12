import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
  FlatList,
  Modal,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import COLORS from "../../constants/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Header from "../../general components/header";
import AdminNavBar from "../../general components/AdminNavBar";
import Icon from "react-native-vector-icons/MaterialIcons";
import { generateEmojiForItem } from "../../api/emoji";
import { REACT_APP_UNSPLASH_API } from "@env";

const UNSPLASH_API_KEY = REACT_APP_UNSPLASH_API;
const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random";

const ItemComponent = ({
  item,
  onIncrement,
  onDecrement,
  onDelete,
  isEditing,
  onExpand,
  isExpanded,
  onEditField,
  editableField,
  setEditableField,
  onSaveEdit,
  imageUrl,
}) => (
  <View
    style={[styles.itemContainer, isExpanded ? styles.expandedContainer : null]}
  >
    <TouchableOpacity onPress={onExpand}>
      <View style={styles.itemDetails}>
        {!isExpanded && (
          <>
            <View style={styles.emojiContainer}>
              <Text>{item.emoji}</Text>
            </View>
            <View style={styles.itemName}>
              <Text style={styles.itemNameText}>{item.itemName}</Text>
              <Text style={styles.itemDetailText}>
                Quantity: {item.quantity}
              </Text>
              <Text style={styles.itemDetailText}>Price: ${item.price}</Text>
            </View>
            {isEditing && (
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  onPress={onDecrement}
                  style={styles.controlButton}
                >
                  <FontAwesome name="minus" size={16} color="red" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={onIncrement}
                  style={styles.controlButton}
                >
                  <FontAwesome name="plus" size={16} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                  <FontAwesome
                    name="trash"
                    size={16}
                    color="red"
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
    {isExpanded && (
      <View style={styles.expandedDetails}>
        <Text style={styles.itemNameOnImage}>{item.itemName}</Text>
        {item.image && (
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.itemImage}
          />
        )}

        <Pressable
          onPress={() => setEditableField({ id: item.id, field: "expiryDate" })}
          style={styles.sliderButton}
        >
          {editableField.id === item.id &&
          editableField.field === "expiryDate" ? (
            <Modal visible={true} transparent={true} animationType="slide">
              <View style={styles.modalOverlay}>
                <View style={styles.editModalContainer}>
                  <TextInput
                    style={styles.input}
                    value={editableField.value}
                    onChangeText={(text) =>
                      setEditableField({ ...editableField, value: text })
                    }
                    onBlur={() => onSaveEdit(item.id, "expiryDate")}
                    autoFocus
                  />
                  <TouchableOpacity
                    onPress={() => onSaveEdit(item.id, "expiryDate")}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      setEditableField({ id: null, field: "", value: "" })
                    }
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : (
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Expiry Date:</Text>
              <Text style={styles.sliderValue}>{item.expiryDate}</Text>
              <Icon name="chevron-right" size={20} color="#888" />
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={() => setEditableField({ id: item.id, field: "price" })}
          style={styles.sliderButton}
        >
          {editableField.id === item.id && editableField.field === "price" ? (
            <Modal visible={true} transparent={true} animationType="slide">
              <View style={styles.modalOverlay}>
                <View style={styles.editModalContainer}>
                  <TextInput
                    style={styles.input}
                    value={editableField.value}
                    onChangeText={(text) =>
                      setEditableField({ ...editableField, value: text })
                    }
                    onBlur={() => onSaveEdit(item.id, "price")}
                    autoFocus
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    onPress={() => onSaveEdit(item.id, "price")}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      setEditableField({ id: null, field: "", value: "" })
                    }
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : (
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Price:</Text>
              <Text style={styles.sliderValue}>${item.price}</Text>
              <Icon name="chevron-right" size={20} color="#888" />
            </View>
          )}
        </Pressable>
      </View>
    )}
  </View>
);

const AdminHome = () => {
  const [items, setItems] = useState([
    {
      id: "Gardenia Bread",
      emoji: "🍞",
      itemName: "Gardenia Bread",
      quantity: 1,
      expiryDate: "2023-12-31",
      price: 5,
      image:
        "https://www.budgetbytes.com/wp-content/uploads/2023/08/Garlic-Bread-close.jpg",
    },
    {
      id: "Eggs",
      emoji: "🥚",
      itemName: "Eggs",
      quantity: 12,
      expiryDate: "2023-12-31",
      price: 2,
      image:
        "https://www.simplyrecipes.com/thmb/zsQvDavpqD2PtIO-7W6nBWVHCe4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Hard-Boiled-Eggs-LEAD-03-42506773297f4a15920c46628d534d67.jpg",
    },
    {
      id: "Milk",
      emoji: "🥛",
      itemName: "Milk",
      quantity: 2,
      expiryDate: "2023-12-31",
      price: 1,
      image:
        "https://www.southernliving.com/thmb/zCKBQZG85v0gxUpn5Nm_8elGJaA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1413944242-79c406e0bbe4435596bc671f95a949cb.jpg",
    },
    {
      id: "Peanut Butter",
      emoji: "🥜",
      itemName: "Peanut Butter",
      quantity: 1,
      expiryDate: "2023-12-31",
      price: 4,
      image:
        "https://joyfoodsunshine.com/wp-content/uploads/2020/04/homemade-peanut-butter-recipe-16x9-2.jpg",
    },
    {
      id: "Dragon Fruit",
      emoji: "🐉",
      itemName: "Dragon Fruit",
      quantity: 3,
      expiryDate: "2023-12-31",
      price: 4,
      image:
        "https://www.verywellhealth.com/thmb/Ext8JqAVCEre8mhP02lUrFXz71E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/VWH-GettyImages-1330385063-baf7c7cf81534999aa4cbdd398c5e3ed.jpg",
    },
  ]);

  const [imageUrls, setImageUrls] = useState({}); // State to store image URLs
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: 1,
    price: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [editableField, setEditableField] = useState({
    id: null,
    field: "",
    value: "",
  });

  const toggleEditMode = () => setIsEditing(!isEditing);

  const handleAddItem = async () => {
    if (newItem.itemName && newItem.quantity > 0 && newItem.price !== "") {
      const itemExists = items.some(
        (item) => item.itemName.toLowerCase() === newItem.itemName.toLowerCase()
      );
      if (itemExists) {
        alert("Item already exists in the list");
        return;
      }
      setLoading(true);
      try {
        const emoji = await generateEmojiForItem(newItem.itemName);
        const imageUrl = await fetchImageFromUnsplash(
          newItem.itemName,
          UNSPLASH_API_KEY
        ); // Fetch image URL
        const newItemWithId = {
          ...newItem,
          id: newItem.itemName,
          emoji,
          image: imageUrl, // Pass imageUrl as image
        };
        setItems([...items, newItemWithId]);
        setNewItem({ itemName: "", quantity: 1, price: "" });
        setModalVisible(false);
      } catch (error) {
        console.error("Error fetching emoji or image:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDeleteItem = (id) =>
    setItems(items.filter((item) => item.id !== id));

  const handleIncrement = (id) =>
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const handleDecrement = (id) =>
    setItems(
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  const handleExpandItem = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleEditField = (id, field) => {
    const item = items.find((item) => item.id === id);
    setEditableField({ id, field, value: item[field] });
  };

  const handleSaveEdit = (id, field) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: editableField.value } : item
      )
    );
    setEditableField({ id: null, field: "", value: "" });
  };

  const fetchImageFromUnsplash = async (itemName, accessKey) => {
    const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(
      itemName
    )}&client_id=${accessKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.results[0].urls.small);
      if (data.results && data.results.length > 0) {
        const imageUrl = data.results[0].urls.small;
        return imageUrl;
      } else {
        throw new Error("No image found for the given item.");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemComponent
            item={item}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
            onDelete={() => handleDeleteItem(item.id)}
            isEditing={isEditing}
            onExpand={() => handleExpandItem(item.id)}
            isExpanded={expandedItemId === item.id}
            onEditField={handleEditField}
            editableField={editableField}
            setEditableField={setEditableField}
            onSaveEdit={handleSaveEdit}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.newModalContainer}>
            <Text style={styles.newModalTitle}>Add New Item</Text>
            <TextInput
              placeholder="Item Name"
              value={newItem.itemName}
              onChangeText={(text) =>
                setNewItem({ ...newItem, itemName: text })
              }
              style={styles.newInput}
            />
            <TextInput
              placeholder="Quantity"
              value={String(newItem.quantity)}
              onChangeText={(text) =>
                setNewItem({ ...newItem, quantity: Number(text) })
              }
              keyboardType="numeric"
              style={styles.newInput}
            />
            <TextInput
              placeholder="Price"
              value={String(newItem.price)}
              onChangeText={(text) =>
                setNewItem({ ...newItem, price: Number(text) })
              }
              keyboardType="numeric"
              style={styles.newInput}
            />
            <TouchableOpacity
              onPress={handleAddItem}
              style={styles.newModalButton}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.newModalButtonText}>Add Item</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.newModalButtonCancel}
            >
              <Text style={styles.newModalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={toggleEditMode}
          style={[styles.smallButton, isEditing && styles.activeControlButton]}
        >
          <FontAwesome
            name="edit"
            size={35}
            color={isEditing ? "white" : "blue"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.smallButton}
        >
          <Ionicons name="add-circle" size={50} color="green" />
        </TouchableOpacity>
      </View>
      <AdminNavBar />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  smallButton: {
    backgroundColor: "transparent",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  activeControlButton: {
    backgroundColor: "#007bff",
  },
  controlButtonText: {
    marginLeft: 5,
    color: "black",
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  expandedContainer: {
    marginTop: 10,
    backgroundColor: "white",
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  emojiContainer: {
    margin: 15,
  },
  itemName: {
    flex: 1,
    margin: 10,
  },
  itemNameText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemDetailText: {
    fontSize: 14,
    color: "black",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  controlButton: {
    padding: 5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  deleteIcon: {
    marginLeft: 10,
  },
  itemImage: {
    width: "100%",
    height: 210,
    alignSelf: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 5,
    width: 200,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  editModalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonCancel: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
  },
  itemDetailsContainer: {
    flexDirection: "row", // Arrange itemDetails and quantityControls in a row
    justifyContent: "space-between", // Space them out
    alignItems: "center", // Align them center vertically
  },
  expandedDetails: {
    marginTop: 10,
    position: "relative", // Ensure positioning for itemNameOnImage
  },
  itemNameOnImage: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: 5,
    borderRadius: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  editableButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 2,
  },
  sliderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 25,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
  },
  sliderValue: {
    fontSize: 16,
    color: "#666",
    flex: 1,
    textAlign: "right",
  },

  newModalContainer: {
    width: 350,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newModalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  newInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10,
    width: "100%",
    padding: 10,
    fontSize: 16,
  },
  newModalButton: {
    padding: 15,
    backgroundColor: "#28a745",
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  newModalButtonCancel: {
    padding: 15,
    backgroundColor: "red",
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  newModalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdminHome;
