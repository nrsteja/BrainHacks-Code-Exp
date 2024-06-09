import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ItemComponent = ({
  emoji,
  itemName,
  quantity,
  onIncrement,
  onDecrement,
  onDelete,
}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <View style={styles.emojiContainer}>
          <Text>{emoji}</Text>
        </View>
        <View style={styles.itemName}>
          <Text>{itemName}</Text>
          <Text>Quantity: {quantity}</Text>
        </View>
      </View>
      <View style={styles.quantityControls}>
        <Pressable onPress={onDecrement} style={styles.controlButton}>
          <FontAwesome name="minus" size={16} color="white" />
        </Pressable>
        <Pressable onPress={onIncrement} style={styles.controlButton}>
          <FontAwesome name="plus" size={16} color="white" />
        </Pressable>
        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <FontAwesome name="trash" size={16} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

function EditPage() {
  const [items, setItems] = useState([
    { id: "1", emoji: "🍞", itemName: "Gardenia Bread", quantity: 1 },
    { id: "2", emoji: "🥚", itemName: "Eggs", quantity: 12 },
    { id: "3", emoji: "🥛", itemName: "Milk", quantity: 2 },
    { id: "4", emoji: "🥜", itemName: "Peanut Butter", quantity: 1 },
    { id: "5", emoji: "🐉", itemName: "Dragon Fruit", quantity: 3 },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({
    emoji: "",
    itemName: "",
    quantity: 1,
  });

  const handleAddItem = () => {
    setItems([...items, { ...newItem, id: (items.length + 1).toString() }]);
    setNewItem({ emoji: "", itemName: "", quantity: 1 });
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleIncrement = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GroceryGrabber</Text>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={toggleEditMode} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>
            {isEditing ? "Done" : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
      {isEditing && (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Emoji"
            value={newItem.emoji}
            onChangeText={(text) => setNewItem({ ...newItem, emoji: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={newItem.itemName}
            onChangeText={(text) => setNewItem({ ...newItem, itemName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={newItem.quantity.toString()}
            onChangeText={(text) =>
              setNewItem({ ...newItem, quantity: parseInt(text) })
            }
          />
          <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemComponent
            emoji={item.emoji}
            itemName={item.itemName}
            quantity={item.quantity}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
            onDelete={() => handleDeleteItem(item.id)}
          />
        )}
        contentContainerStyle={styles.itemsContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    maxWidth: 480,
    alignItems: "center",
    marginHorizontal: "auto",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "100%",
    backgroundColor: "green",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    marginTop: 16,
  },
  updateButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "#6b6b6b",
    borderRadius: 100,
  },
  updateButtonText: {
    color: "#ececec",
  },
  editContainer: {
    width: "100%",
    padding: 16,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "green",
    borderRadius: 100,
    marginTop: 8,
  },
  addButtonText: {
    color: "white",
  },
  itemsContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 16,
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  emojiContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "white",
    borderRadius: 16,
    height: 52,
    width: 52,
  },
  itemName: {
    marginLeft: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#ff4d4d",
    height: 32,
    width: 32,
    marginHorizontal: 4,
    borderRadius: 16,
  },
  controlButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "red",
    height: 32,
    width: 32,
    marginHorizontal: 4,
    borderRadius: 16,
  },
});

export default EditPage;
