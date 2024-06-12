import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  TextInput,
  Clipboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import Header from "../../general components/header";
import AdminNavBar from "../../general components/AdminNavBar";
import COLORS from "../../constants/colors";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const ProfileItem = ({ icon, label, value, onEdit }) => (
  <View style={styles.profileItemContainer}>
    <View style={styles.profileItemDetails}>
      <View style={styles.profileIconContainer}>
        <FontAwesome name={icon} size={24} color={COLORS.black} />
      </View>
      <View style={styles.profileItemTextContainer}>
        <Text style={styles.profileItemValue}>{value}</Text>
        <Text style={styles.profileItemLabel}>{label}</Text>
      </View>
    </View>
    <TouchableOpacity onPress={onEdit} style={styles.editButton}>
      <FontAwesome name="chevron-right" size={16} color={COLORS.grey} />
    </TouchableOpacity>
  </View>
);

const AdminProfile = () => {
  const [user, setUser] = useState({
    name: "Woodlands Fairprice",
    logo: "👤",
    accountNumber: "1234567890",
    accountName: "Woodlands Fairprice",
    address: "Woodlands, Singapore",
    phoneNumber: "92350345",
    emailAddress: "wdlsFairprice@gmail.com",
    idVerification: "Verified",
    parentCompanyName: "NTUC Fairprice",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [newFieldValue, setNewFieldValue] = useState("");
  const [parentCompanyOther, setParentCompanyOther] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [parentCompanyItems, setParentCompanyItems] = useState([
    { label: "NTUC Fairprice", value: "NTUC Fairprice" },
    { label: "Prime", value: "Prime" },
    { label: "Giant", value: "Giant" },
    { label: "Sheng Siong", value: "Sheng Siong" },
    { label: "Other", value: "Other" },
  ]);

  const navigation = useNavigation();

  const handleCopyAccountNumber = () => {
    Clipboard.setString(user.accountNumber);
    Toast.show({
      type: "success",
      text1: "Copied",
      text2: "Account number copied to clipboard",
    });
  };

  const handleEdit = (field) => {
    setEditingField(field);
    if (field === "parentCompanyName") {
      setParentCompanyOther(user[field] === "Other");
    }
    setNewFieldValue(user[field]);
    setModalVisible(true);
  };

  const handleParentCompanyChange = (value) => {
    setNewFieldValue(value);
    setParentCompanyOther(value === "Other");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    if (editingField === "phoneNumber" && !/^\+65 \d{8}$/.test(newFieldValue)) {
      Toast.show({
        type: "error",
        text1: "Invalid Phone Number",
        text2: "Phone number must be in the format +65 followed by 8 digits",
      });
      return;
    }
    if (editingField === "emailAddress" && !validateEmail(newFieldValue)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email Address",
        text2: "Please enter a valid email address",
      });
      return;
    }
    setUser((prevUser) => ({
      ...prevUser,
      [editingField]: newFieldValue,
      ...(editingField === "accountName" && { name: newFieldValue }), // Update name if accountName is edited
    }));
    setModalVisible(false);
  };

  const handleSignOut = () => {
    // Add sign-out functionality here
    navigation.navigate("Login");
    Toast.show({
      type: "success",
      text1: "Signed Out",
      text2: "You have been signed out successfully",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.profileHeader}>
        <View style={styles.profileHeaderContent}>
          <Text style={styles.profileLogo}>{user.logo}</Text>
          <Text style={styles.profileName}>{user.name}</Text>
        </View>
        <View style={styles.accountNumberContainer}>
          <Text style={styles.profileAccountNumber}>
            Account Number: {user.accountNumber}
          </Text>
          <TouchableOpacity
            onPress={handleCopyAccountNumber}
            style={styles.copyButton}
          >
            <FontAwesome name="copy" size={16} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
      <View style={styles.profileItemsContainer}>
        <ProfileItem
          icon="user"
          label="Account Name"
          value={user.accountName}
          onEdit={() => handleEdit("accountName")}
        />
        <ProfileItem
          icon="map-marker"
          label="Address"
          value={user.address}
          onEdit={() => handleEdit("address")}
        />
        <ProfileItem
          icon="phone"
          label="Phone Number"
          value={user.phoneNumber}
          onEdit={() => handleEdit("phoneNumber")}
        />
        <ProfileItem
          icon="envelope"
          label="Email Address"
          value={user.emailAddress}
          onEdit={() => handleEdit("emailAddress")}
        />
        <ProfileItem
          icon="id-card"
          label="Identification Verification"
          value={user.idVerification}
          onEdit={() => handleEdit("idVerification")}
        />
        <ProfileItem
          icon="building"
          label="Parent Company Name"
          value={user.parentCompanyName}
          onEdit={() => handleEdit("parentCompanyName")}
        />
      </View>
      </ScrollView>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
      <AdminNavBar />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <KeyboardAvoidingView
            style={styles.modalContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <Text style={styles.modalTitle}>Edit {editingField}</Text>
            {editingField === "phoneNumber" ? (
              <View style={styles.phoneNumberContainer}>
                <Text style={styles.phonePrefix}>+65</Text>
                <TextInput
                  style={styles.phoneInput}
                  value={newFieldValue.replace("+65 ", "")}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const formattedText = text.replace(/[^0-9]/g, "");
                    setNewFieldValue(`+65 ${formattedText}`);
                  }}
                  maxLength={8}
                />
              </View>
            ) : editingField === "emailAddress" ? (
              <TextInput
                style={styles.input}
                value={newFieldValue}
                onChangeText={(text) => {
                  setNewFieldValue(text);
                  if (!validateEmail(text)) {
                    Toast.show({
                      type: "error",
                      text1: "Invalid Email Address",
                      text2: "Please enter a valid email address",
                    });
                  }
                }}
                keyboardType="email-address"
              />
            ) : editingField === "idVerification" ? (
              <DropDownPicker
                open={dropdownOpen}
                value={newFieldValue}
                items={[
                  { label: "Verified", value: "Verified" },
                  { label: "Unverified", value: "Unverified" },
                ]}
                setOpen={setDropdownOpen}
                setValue={setNewFieldValue}
                containerStyle={styles.pickerContainer}
                dropDownContainerStyle={styles.dropDownContainer}
                zIndex={1000}
              />
            ) : editingField === "parentCompanyName" ? (
                <DropDownPicker
                  open={dropdownOpen}
                  value={newFieldValue}
                  items={parentCompanyItems}
                  setOpen={setDropdownOpen}
                  setValue={handleParentCompanyChange}
                  setItems={setParentCompanyItems}
                  containerStyle={styles.pickerContainer}
                  dropDownContainerStyle={styles.dropDownContainer}
                  zIndex={1000}
                />
            ) : (
              <TextInput
                style={styles.input}
                value={newFieldValue}
                onChangeText={setNewFieldValue}
              />
            )}
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      <Toast position="top" topOffset={50} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileHeader: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  profileHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileLogo: {
    fontSize: 48,
    marginRight: 16,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 28,
    color: COLORS.black,
  },
  accountNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  profileAccountNumber: {
    fontSize: 16,
    color: COLORS.grey,
    marginRight: 8,
  },
  copyButton: {
    padding: 8,
    backgroundColor: "#e9ecef",
    borderRadius: 4,
  },
  profileItemsContainer: {
    flex: 1,
    padding: 16,
  },
  profileItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileItemDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginRight: 12,
    borderColor: COLORS.grey,
    borderWidth: 1,
  },
  profileItemTextContainer: {
    marginLeft: 8,
  },
  profileItemLabel: {
    fontSize: 14,
    color: COLORS.grey,
  },
  profileItemValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.black,
  },
  editButton: {
    padding: 12,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 20,
  },
  phoneNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  phonePrefix: {
    fontSize: 16,
    color: COLORS.black,
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  input: {
    width: "100%",
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  pickerContainer: {
    width: "100%",
    marginVertical: 8,
  },
  dropDownContainer: {
    borderColor: COLORS.grey,
    borderWidth: 1,
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: COLORS.dark_green,
    borderRadius: 100,
    marginTop: 8,
    width: "100%",
  },
  saveButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: COLORS.red,
    borderRadius: 100,
    marginTop: 8,
    marginBottom: 20,
    width: "100%",
  },
  cancelButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  signOutButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: COLORS.blue,
    borderRadius: 100,
    marginVertical: 20,
    alignSelf: "center",
  },
  signOutButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});

export default AdminProfile;
