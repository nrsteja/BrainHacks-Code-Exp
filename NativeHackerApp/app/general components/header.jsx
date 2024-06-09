import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>GroceryGrabber</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: "3.5%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: COLORS.green,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
});

export default Header;
