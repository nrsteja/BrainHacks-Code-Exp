import * as React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

function Itenary() {
  const handleEditPress = () => {
    console.log("Edit button pressed");
  };

  const handleAddPress = () => {
    console.log("Add button pressed");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      maxWidth: 480,
      alignSelf: "center",
    },
    header: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 4,
      backgroundColor: "gray",
      textAlign: "center",
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
    searchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginTop: 12,
      backgroundColor: "gray",
      borderRadius: 15,
      alignSelf: "center",
      maxWidth: 323,
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
      backgroundColor: "gray",
      borderRadius: 15,
      alignSelf: "center",
    },
    filterText: {
      fontSize: 16,
      color: "white",
      textAlign: "center",
    },
    listContainer: {
      paddingHorizontal: 10,
      paddingVertical: 12,
      width: "100%",
    },
    itemsHeaderText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "green",
    },
    itemText: {
      fontSize: 18,
      marginTop: 12,
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
      marginTop: 12,
    },
    expiringText: {
      fontSize: 18,
      textAlign: "center",
      marginTop: 12,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 60,
      alignItems: "center",
    },
    editButton: {
      justifyContent: "center",
      paddingHorizontal: 32,
      paddingVertical: 16,
      backgroundColor: "gray",
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
      backgroundColor: "gray",
      borderRadius: 35,
      height: 70,
      width: 70,
    },
    addButtonText: {
      fontSize: 30,
      color: "white",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>Filters</Text>
        <Text style={styles.filterText}>expand_more</Text>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        <Text style={styles.itemsHeaderText}>Items in your house:</Text>
        <View style={styles.flexRow}>
          <View style={styles.itemFlex}>
            <Text style={styles.itemText}>White Bread</Text>
            <Text style={styles.itemText}>Eggs x12</Text>
            <Text style={styles.itemText}>Almonds</Text>
            <Text style={styles.itemText}>Spinach</Text>
            <Text style={styles.itemText}>Cabbage x2</Text>
            <Text style={styles.itemText}>Bananas x6</Text>
            <Text style={styles.itemText}>Fresh Orange Juice</Text>
            <Text style={styles.itemText}>Milk x3</Text>
          </View>
          <View style={styles.itemFlex}>
            <Text style={styles.boughtText}>12/03</Text>
            <Text style={styles.boughtText}>11/03</Text>
            <Text style={styles.boughtText}>12/03</Text>
            <Text style={styles.boughtText}>12/03</Text>
            <Text style={styles.boughtText}>12/03</Text>
            <Text style={styles.boughtText}>12/03</Text>
            <Text style={styles.boughtText}>12/03</Text>
            <Text style={styles.boughtText}>12/03</Text>
          </View>
          <View style={styles.itemFlex}>
            <Text style={styles.expiringText}>3 days</Text>
            <Text style={styles.expiringText}>10 days</Text>
            <Text style={styles.expiringText}>2 weeks</Text>
            <Text style={styles.expiringText}>5 days</Text>
            <Text style={styles.expiringText}>5 days</Text>
            <Text style={styles.expiringText}>2 days</Text>
            <Text style={styles.expiringText}>14 days</Text>
            <Text style={styles.expiringText}>7 days</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={{ alignSelf: "stretch", height: 500 }}
        source={{ uri: "https://via.placeholder.com/1440x656" }}
      />
    </View>
  );
}

export default Itenary;
