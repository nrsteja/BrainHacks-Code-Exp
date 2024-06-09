import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  FlatList,
  Modal,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import Header from "../../general components/header";
import AdminNavBar from "../../general components/AdminNavBar";

const ItemComponent = ({
  item,
  onIncrement,
  onDecrement,
  onDelete,
  isEditing,
}) => (
  <View style={styles.itemContainer}>
    <View style={styles.itemDetails}>
      <View style={styles.emojiContainer}>
        <Text>{item.emoji}</Text>
      </View>
      <View style={styles.itemName}>
        <Text style={styles.itemNameText}>{item.itemName}</Text>
        <Text style={styles.itemDetailText}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemDetailText}>Price: ${item.price}</Text>
      </View>
    </View>
    {isEditing && (
      <View style={styles.quantityControls}>
        <Pressable onPress={onDecrement} style={styles.controlButton}>
          <FontAwesome name="minus" size={16} color="red" />
        </Pressable>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <Pressable onPress={onIncrement} style={styles.controlButton}>
          <FontAwesome name="plus" size={16} color="green" />
        </Pressable>
        <Pressable onPress={onDelete}>
          <FontAwesome
            name="trash"
            size={16}
            color="red"
            style={styles.deleteIcon}
          />
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
      price: 2.5,
    },
    { id: "Eggs", emoji: "🥚", itemName: "Eggs", quantity: 12, price: 3.0 },
    { id: "Milk", emoji: "🥛", itemName: "Milk", quantity: 2, price: 1.5 },
    {
      id: "Peanut Butter",
      emoji: "🥜",
      itemName: "Peanut Butter",
      quantity: 1,
      price: 4.0,
    },
    {
      id: "Dragon Fruit",
      emoji: "🐉",
      itemName: "Dragon Fruit",
      quantity: 3,
      price: 5.0,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: 1,
    price: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEditMode = () => setIsEditing(!isEditing);

  const handleAddItem = async () => {
    if (newItem.itemName && newItem.quantity > 0 && newItem.price > 0) {
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
        const newItemWithId = { ...newItem, id: newItem.itemName, emoji };
        setItems([...items, newItemWithId]);
        setNewItem({ itemName: "", quantity: 1, price: "" });
        setModalVisible(false);
      } catch (error) {
        console.error("Error fetching emoji:", error);
      } finally {
        setLoading(false);
      }
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

  const getEmojiForItem = (itemName) => {
    const lowerName = itemName.toLowerCase();
    const emojiMap = {
      bread: "🍞",
      egg: "🥚",
      milk: "🥛",
      butter: "🧈",
      "peanut butter": "🥜",
      "dragon fruit": "🐉",
      apple: "🍎",
      greenapple: "🍏",
      pineapple: "🍍",
      banana: "🍌",
      grape: "🍇",
      orange: "🍊",
      watermelon: "🍉",
    };

    return Object.keys(emojiMap).find((key) => lowerName.includes(key))
      ? emojiMap[lowerName]
      : "🛒";
  };

  const generateEmojiForItem = async (itemName) => {
    const emojiFromList = getEmojiForItem(itemName);
    if (emojiFromList !== "🛒") {
      return emojiFromList;
    }

    const API_KEY = "WWefpee1V8CnIEPVACBWmg==0ZKBI8hZKGqvHZFE";
    const url = `https://api.api-ninjas.com/v1/emoji?name=${itemName}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": API_KEY,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch emoji");
      }
      const data = await response.json();
      return data[0].character;
    } catch (error) {
      console.error("Error fetching emoji:", error);
      return "🛒";
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
          />
        )}
        contentContainerStyle={styles.itemsContainer}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={newItem.itemName}
              onChangeText={(text) =>
                setNewItem({ ...newItem, itemName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={newItem.quantity.toString()}
              onChangeText={(text) =>
                setNewItem({ ...newItem, quantity: text ? parseInt(text) : "" })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={newItem.price.toString()}
              onChangeText={(text) =>
                setNewItem({ ...newItem, price: text ? parseFloat(text) : "" })
              }
            />
            <TouchableOpacity
              onPress={handleAddItem}
              style={styles.addItemButton}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.addItemButtonText}>Add Item</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={toggleEditMode} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>
            {isEditing ? "Done" : "Update"}
          </Text>
        </TouchableOpacity>
        {isEditing && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
        )}
      </View>
      <AdminNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  updateButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#007bff",
    borderRadius: 100,
    marginRight: 16,
  },
  updateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#28a745",
    borderRadius: 100,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  itemsContainer: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 12,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  emojiContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    height: 52,
    width: 52,
    marginRight: 12,
    borderColor: "#dee2e6",
    borderWidth: 1,
  },
  itemName: {
    marginLeft: 8,
  },
  itemNameText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#343a40",
  },
  itemDetailText: {
    fontSize: 14,
    color: "#6c757d",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#ffffff",
    borderColor: "#dee2e6",
    borderWidth: 1,
    height: 32,
    width: 32,
    marginHorizontal: 4,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityText: {
    marginHorizontal: 8,
    fontWeight: "bold",
    color: "#343a40",
  },
  deleteIcon: {
    marginLeft: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },
  addItemButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#28a745",
    borderRadius: 100,
    marginTop: 8,
    width: "100%",
  },
  addItemButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#dc3545",
    borderRadius: 100,
    marginTop: 8,
    width: "100%",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AdminHome;
