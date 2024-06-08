import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

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
    backgroundColor: "green",
    borderRadius: "50%",
    alignSelf: "center",
  },
  filterText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default Filter;
