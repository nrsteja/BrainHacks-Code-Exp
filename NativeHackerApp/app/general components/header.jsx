import React from "react";
import { View, Text, StyleSheet, Platform, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>GroceryGrabber</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS == "ios" ? "3.5%" : "7.5%", 
    paddingBottom: Platform.OS == "ios" ? "3.5%" : null, 
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: COLORS.green,
    // if platform is ios, then ignore... otherwise height = 0.05*height    
    height: Platform.OS == "ios" ? null : "10%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
});

export default Header;
