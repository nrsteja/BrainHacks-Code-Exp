import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../general components/header";

const { width } = Dimensions.get("window");

const ProfileCard = ({ imageUrl, name, daysSaved }) => (
  <View style={styles.profileContainer}>
    <Text style={styles.profileName}>{name}</Text>
    <View style={styles.daysSavedContainer}>
      <Image source={{ uri: imageUrl }} style={styles.profileImage} />
      <Text style={styles.daysSavedText}>{daysSaved}</Text>
    </View>
    <Text style={styles.subtitle}>Days of earth you have saved</Text>
  </View>
);

const SettingItem = ({ iconUrl, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.settingItem}>
    <Image source={{ uri: iconUrl }} style={styles.settingIcon} />
    <Text style={styles.settingItemText}>{label}</Text>
  </TouchableOpacity>
);

const CustomSwitch = ({ value, onValueChange }) => (
  <TouchableOpacity
    style={[styles.switch, value ? styles.switchOn : styles.switchOff]}
    onPress={onValueChange}
  >
    <View style={[styles.slider, value ? styles.sliderOn : styles.sliderOff]} />
  </TouchableOpacity>
);

const ToggleItem = ({ label, value, onToggle }) => (
  <View style={styles.toggleItemContainer}>
    <Text style={styles.settingItemText}>{label}</Text>
    <CustomSwitch value={value} onValueChange={onToggle} />
  </View>
);

function Account() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isPushNotifications, setIsPushNotifications] = React.useState(false);

  const handleEditProfile = () => Alert.alert("Edit profile clicked");
  const handleChangePassword = () => Alert.alert("Change password clicked");
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    Alert.alert("Dark mode toggled");
  };
  const handlePushNotificationsToggle = () => {
    setIsPushNotifications(!isPushNotifications);
    Alert.alert("Push notifications toggled");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ProfileCard
          imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/7611a6a8b21db1ffd7d72b26deed298c206723f270e908d33d06ecc90f247e9a?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&"
          name="Kaliraj Santosh"
          daysSaved="330"
        />
        <Text style={styles.settingsTitle}>Settings</Text>
        <View style={styles.settingsContainer}>
          <SettingItem
            iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/31032d447a397d461dca8487d83d26125a5d62d04c8d5fe97a2b1b8ab22e231c?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&"
            label="Kaliraj Santoshraj"
            onPress={() => Alert.alert("Account Settings clicked")}
          />
          <Text style={styles.sectionText}>Account Settings</Text>
          <TouchableOpacity
            onPress={handleEditProfile}
            style={styles.flexColItem}
          >
            <Text style={styles.settingItemText}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleChangePassword}
            style={styles.flexColItem}
          >
            <Text style={styles.settingItemText}>Change password</Text>
          </TouchableOpacity>
          <ToggleItem
            label="Dark mode"
            onToggle={handleDarkModeToggle}
            value={isDarkMode}
          />
          <ToggleItem
            label="Push notifications"
            onToggle={handlePushNotificationsToggle}
            value={isPushNotifications}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContainer: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  profileContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#065f46",
    marginVertical: 8,
    textAlign: "center",
  },
  daysSavedContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: width * 0.5,
    width: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: "#ffdd57",
    marginTop: 8,
  },
  profileImage: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: width * 0.25,
  },
  daysSavedText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#065f46",
    marginTop: 20,
    marginBottom: 12,
    width: "90%",
    textAlign: "center",
  },
  settingsContainer: {
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2.5,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20, // add margin to prevent overlap
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  settingIcon: {
    width: 40,
    height: 40,
  },
  settingItemText: {
    fontSize: 20,
    color: "#000",
    marginLeft: 10,
    flex: 1,
  },
  sectionText: {
    marginTop: 20,
    fontSize: 18,
    color: "#a1a1aa",
    width: "100%",
    marginLeft: 10,
  },
  flexCol: {
    width: "100%",
  },
  flexColItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  toggleItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
  },
  switch: {
    position: "relative",
    width: 60,
    height: 32,
    backgroundColor: "#ccc",
    borderRadius: 34 / 2,
    padding: 2,
  },
  switchOn: {
    backgroundColor: "#2196F3",
  },
  switchOff: {
    backgroundColor: "#ccc",
  },
  slider: {
    position: "absolute",
    top: 1,
    left: 1,
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 15,
    transition: ".4s",
  },
  sliderOn: {
    transform: [{ translateX: 26 }],
  },
  sliderOff: {
    transform: [{ translateX: 0 }],
  },
});

export default Account;
