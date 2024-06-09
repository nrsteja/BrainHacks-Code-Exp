import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const AdminNavBar = () => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="home" size={24} color="white" />
        <Text style={styles.navButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <Ionicons name="person" size={24} color="white" />
        <Text style={styles.navButtonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: "1.5%",
    backgroundColor: COLORS.green,
  },
  navButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    color: "white",
    marginTop: 4,
  },
});

export default AdminNavBar;
