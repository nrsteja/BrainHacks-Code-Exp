import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>GroceryGrabber</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#619f75",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

export default Header;
