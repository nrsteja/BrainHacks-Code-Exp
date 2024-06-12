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
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../general components/header";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const ProfileCard = ({ imageUrl, name, daysSaved }) => (
  <View style={styles.profileContainer}>
    <Text style={styles.profileName}>{name}</Text>
    <View style={styles.daysSavedContainer}>
      <Image source={{ uri: imageUrl }} style={styles.profileImage} />
      <Text style={styles.daysSavedText}>{daysSaved}</Text>
    </View>
    <Text style={styles.subtitle}>Days of Earth You Have Saved</Text>
  </View>
);

const SettingItem = ({ iconUrl, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.settingItem}>
    <Image source={{ uri: iconUrl }} style={styles.settingIcon} />
    <Text style={styles.settingItemText}>{label}</Text>
  </TouchableOpacity>
);

function calculateEarthSurvivalHours(foodWasteSavedKg) {
  // Constants
  const CO2eAvoidedPerKg = 2.5; // kg of CO2 avoided per kg of food waste
  const CH4AvoidedPerKg = 18.5; // grams of CH4 avoided per kg of food waste
  const CH4ToCO2eConversionFactor = 25; // 1 gram of CH4 is equivalent to 25 grams of CO2e
  const MealsSavedPerKg = 4; // meals saved per kg of food waste
  const EnvironmentalWeight = 0.7; // weight for environmental impact
  const SocialWeight = 0.3; // weight for social impact

  // Calculate total CO2e avoided per kg of food waste
  const CH4AvoidedCO2e = (CH4AvoidedPerKg * CH4ToCO2eConversionFactor) / 1000; // convert grams to kg
  const totalCO2eAvoidedPerKg = CO2eAvoidedPerKg + CH4AvoidedCO2e;

  // Calculate weighted impacts
  const environmentalImpact = totalCO2eAvoidedPerKg * EnvironmentalWeight;
  const socialImpact = MealsSavedPerKg * SocialWeight;

  // Total impact in hours of Earth survival per kg of food waste saved
  const hoursOfEarthSurvivalPerKg = environmentalImpact + socialImpact;

  // Calculate the total hours of Earth survival for the given input
  const totalHoursOfEarthSurvival =
    foodWasteSavedKg * hoursOfEarthSurvivalPerKg;
  const totalDaysOfEarthSurvival = totalHoursOfEarthSurvival / 24;

  return `${totalDaysOfEarthSurvival.toFixed(2)}`;
}

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
  const navigation = useNavigation();
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
          daysSaved={calculateEarthSurvivalHours(15.5)}
        />
        <Text style={styles.settingsTitle}>Settings</Text>
        <View style={styles.settingsContainer}>
          <SettingItem
            iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/31032d447a397d461dca8487d83d26125a5d62d04c8d5fe97a2b1b8ab22e231c?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&"
            label="Kaliraj Santoshraj"
            onPress={() => Alert.alert("Account Settings clicked")}
          />
          <Text style={styles.sectionText}>Account Settings</Text>
          <Button
            title="Sign Out"
            onPress={() => navigation.navigate("Login")}
          />
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
    backgroundColor: COLORS.white,
  },
  scrollViewContainer: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dark_green,
  },
  profileContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark_green,
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
    color: COLORS.white,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
    textAlign: "center",
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark_green,
    marginTop: 20,
    marginBottom: 12,
    width: "90%",
    textAlign: "center",
  },
  settingsContainer: {
    width: "90%",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2.5,
    elevation: 5,
    backgroundColor: COLORS.white,
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
    color: COLORS.black,
    marginLeft: 10,
    flex: 1,
  },
  sectionText: {
    marginTop: 20,
    fontSize: 18,
    color: COLORS.grey,
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
    backgroundColor: COLORS.grey,
    borderRadius: 34 / 2,
    padding: 2,
  },
  switchOn: {
    backgroundColor: COLORS.blue,
  },
  switchOff: {
    backgroundColor: COLORS.grey,
  },
  slider: {
    position: "absolute",
    top: 1,
    left: 1,
    width: 30,
    height: 30,
    backgroundColor: COLORS.white,
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
