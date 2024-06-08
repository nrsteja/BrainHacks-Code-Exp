import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";

const ItemComponent = ({ emoji, itemName }) => {
  const handleIncrement = () => {};
  const handleDecrement = () => {};

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <View style={styles.emojiContainer}>
          <Text>{emoji}</Text>
        </View>
        <View style={styles.itemName}>
          <Text>{itemName}</Text>
        </View>
      </View>
      <View style={styles.quantityControls}>
        <Pressable onPress={handleDecrement} style={styles.controlButton}>
          <Text>-</Text>
        </Pressable>
        <Pressable onPress={handleIncrement} style={styles.controlButton}>
          <Text>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

function MyComponent() {
  const handleAddItem = () => {};
  const handleDeleteItem = () => {};
  const handleView = () => {};
  const handleUpdate = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GroceryGrabber</Text>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={handleView}>
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
          <Text>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteItem}
          style={styles.deleteButton}
        >
          <Text>Delete Item</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemsContainer}>
        <View style={styles.itemsHeader}>
          <Text style={styles.itemsHeaderText}>Items</Text>
          <Text style={styles.itemsCountText}>5 items</Text>
        </View>
        <ItemComponent emoji="🍜" itemName="Gardenia Bread" />
        <ItemComponent emoji="🍜" itemName="Eggs" />
        <ItemComponent emoji="🍜" itemName="Milk" />
        <ItemComponent emoji="🍜" itemName="Peanut butter" />
        <ItemComponent emoji="🍜" itemName="Dragon Fruit" />
      </View>
      <View style={styles.footer}>
        <View style={styles.footerImageContainer}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a3a3fe259f6c8ab64003e9294a1c9d48a6cd7609019165cce4a3a33a931cab1?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
            }}
            style={styles.footerImage}
          />
        </View>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/30e3d31c19bd0f1572ad7b026331c9ca2f1456fef2f7240082d0d7f41419665f?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={styles.footerSecondImage}
        />
      </View>
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
    paddingVertical: 4,
    width: "100%",
    backgroundColor: "gray",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    marginTop: 16,
  },
  actionText: {
    color: "#4a4a4a",
    fontSize: 20,
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
  divider: {
    marginTop: 32,
    width: "100%",
    height: 1,
    backgroundColor: "black",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "red",
    borderRadius: 50,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "red",
    borderRadius: 50,
  },
  itemsContainer: {
    width: "100%",
    maxWidth: 335,
    marginTop: 16,
  },
  itemsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  itemsHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6b6b6b",
  },
  itemsCountText: {
    fontSize: 12,
    color: "#8c8c8c",
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
    height: 20,
    width: 20,
    marginHorizontal: 4,
  },
  footer: {
    flexDirection: "row",
    paddingLeft: 4,
    paddingRight: 32,
    paddingVertical: 1,
    marginTop: 24,
    width: "100%",
    backgroundColor: "#1c1c1c",
    justifyContent: "space-between",
  },
  footerImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#6b6b6b",
  },
  footerImage: {
    aspectRatio: 1,
    width: 38,
  },
  footerSecondImage: {
    aspectRatio: 1,
    width: 36,
  },
});

export default MyComponent;
