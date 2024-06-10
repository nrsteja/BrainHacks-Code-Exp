import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../constants/colors";

const Filter = ({ isDropdownOpen, setIsDropdownOpen }) => {
  return (
    <TouchableOpacity
      style={styles.filterButton}
      onPress={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <Text style={styles.filterText}>Filter </Text>
      <FontAwesome
        name={isDropdownOpen ? "chevron-up" : "chevron-down"}
        size={16}
        color="white"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2%",
    marginVertical: "1.5%",
    backgroundColor: COLORS.green,
    alignSelf: "center",
    borderRadius: 50,
    width: 100, 
    height: 100,
  },
  filterText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default Filter;
