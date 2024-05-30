import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import axios from "axios";
import COLORS from "../constants/colors";

const CountryCodePicker = ({ selectedCountryCode, setSelectedCountryCode }) => {
  const [countryCodes, setCountryCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const codes = response.data
          .map((country) => ({
            code:
              country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : ""),
            name: country.name.common,
          }))
          .filter((country) => country.code)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountryCodes(codes);
      } catch (error) {
        console.error("Error fetching country codes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryCodes();
  }, []);

  const handlePickerChange = (itemValue) => {
    setSelectedCountryCode(itemValue);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.selectedCodeContainer}
      >
        <Text style={styles.selectedCodeText}>{selectedCountryCode}</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={countryCodes}
              keyExtractor={(item, index) => item.code + index}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePickerChange(item.code)}>
                  <Text
                    style={styles.pickerItem}
                  >{`${item.name} (${item.code})`}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCodeContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 4,
    padding: 10,
    backgroundColor: COLORS.white,
    height: 40,
  },
  selectedCodeText: {
    fontSize: 16,
    color: COLORS.black,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  pickerItem: {
    padding: 15,
    fontSize: 16,
    color: COLORS.black,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default CountryCodePicker;
