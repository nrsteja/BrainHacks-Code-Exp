import * as React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    maxWidth: 480,
    marginHorizontal: "auto",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    width: "100%",
    backgroundColor: "#6b7280",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  profileContainer: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 32,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#065f46",
  },
  daysSavedContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "#ffdd57",
    marginTop: 14,
    alignSelf: "center",
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
    marginTop: 32,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  settingItemText: {
    fontSize: 18,
    color: "#000",
    marginLeft: 12,
  },
  sectionText: {
    marginTop: 56,
    marginLeft: 12,
    fontSize: 18,
    color: "#a1a1aa",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginLeft: 12,
    marginTop: 28,
  },
  flexCol: {
    flexDirection: "column",
  },
  flexColItem: {
    marginTop: 40,
  },
  toggleButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 24,
    marginTop: 24,
    backgroundColor: "#4b5563",
    borderRadius: 24,
  },
  toggleButtonIndicator: {
    height: 22,
    width: 22,
    backgroundColor: "#fff",
    borderRadius: 11,
  },
  toggleButtonText: {
    color: "#fff",
    marginTop: 8,
  },
});

const Header = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const ProfileCard = ({ imageUrl, name, daysSaved }) => (
  <View style={styles.profileContainer}>
    <Text style={styles.profileName}>{name}</Text>
    <View style={styles.daysSavedContainer}>
      <Image
        source={{ uri: imageUrl }}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <Text style={styles.daysSavedText}>{daysSaved}</Text>
    </View>
    <Text style={styles.subtitle}>Days of earth you have saved</Text>
  </View>
);

const SettingItem = ({ iconUrl, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.settingItem}>
    <Image source={{ uri: iconUrl }} style={{ width: 40, height: 40 }} />
    <Text style={styles.settingItemText}>{label}</Text>
  </TouchableOpacity>
);

const ToggleButton = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.toggleButton}>
    <View style={styles.toggleButtonIndicator} />
    <Text style={styles.toggleButtonText}>{label}</Text>
  </TouchableOpacity>
);

function Account() {
  const handleEditProfile = () => Alert.alert("Edit profile clicked");
  const handleChangePassword = () => Alert.alert("Change password clicked");
  const handleDarkModeToggle = () => Alert.alert("Dark mode toggled");
  const handlePushNotificationsToggle = () =>
    Alert.alert("Push notifications toggled");

  return (
    <View style={styles.container}>
      <Header title="GroceryGrabber" />
      <ProfileCard
        imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/7611a6a8b21db1ffd7d72b26deed298c206723f270e908d33d06ecc90f247e9a?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&"
        name="Kaliraj Santosh"
        daysSaved="330"
      />
      <Text style={styles.settingsTitle}>Settings</Text>
      <SettingItem
        iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/31032d447a397d461dca8487d83d26125a5d62d04c8d5fe97a2b1b8ab22e231c?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&"
        label="Kaliraj Santoshraj"
        onPress={() => Alert.alert("Account Settings clicked")}
      />
      <Text style={styles.sectionText}>Account Settings</Text>
      <View style={styles.flexRow}>
        <View style={styles.flexCol}>
          <TouchableOpacity onPress={handleEditProfile}>
            <Text>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleChangePassword}
            style={styles.flexColItem}
          >
            <Text>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDarkModeToggle}
            style={styles.flexColItem}
          >
            <Text>Dark mode</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePushNotificationsToggle}
            style={styles.flexColItem}
          >
            <Text>Push notifications</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexCol}>
          <SettingItem
            iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/87873da39603045ab9bb65fffc1a0b71296ef3b05563bf7637c33a3fbe50b33f?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&"
            label=""
            onPress={handleDarkModeToggle}
          />
          <SettingItem
            iconUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/87873da39603045ab9bb65fffc1a0b71296ef3b05563bf7637c33a3fbe50b33f?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&"
            label=""
            onPress={handlePushNotificationsToggle}
          />
          <ToggleButton label="Dark mode" onPress={handleDarkModeToggle} />
          <ToggleButton
            label="Push notifications"
            onPress={handlePushNotificationsToggle}
          />
        </View>
      </View>
      <View style={styles.flexRow}>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f08b8fe607c48a68493fcc37b78c5a7932c2656501d541bc2c568c4c62dad8e?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
        <Text>Dark mode</Text>
        <ToggleButton label="Toggle Dark mode" onPress={handleDarkModeToggle} />
      </View>
    </View>
  );
}

export default Account;
