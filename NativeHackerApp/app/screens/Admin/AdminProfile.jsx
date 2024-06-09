import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";

// Screen width for responsive design
const screenWidth = Dimensions.get("window").width;

const UserInformation = ({ label, value, iconSrc }) => {
  return (
    <TouchableOpacity
      onPress={() => Alert.alert(`${label}: ${value}`)}
      style={styles.infoContainer}
    >
      <View style={styles.infoContent}>
        <Image source={{ uri: iconSrc }} style={styles.icon} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      </View>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1674691437b4cb1a5f55cc817b1ed0a10f2b254bf06f5c0ed79a8fa7237237c8?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
        }}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );
};

const UserInfoList = ({ data }) => {
  return (
    <View>
      {data.map((info, index) => (
        <UserInformation key={index} {...info} />
      ))}
    </View>
  );
};

const AdminProfile = () => {
  const userInfoData = [
    {
      label: "NTUC FairPrice",
      value: "Parent Company",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2cc2b53f924c0d4bfa2b79729f42dc61a94c6e8f1136b8550d5b9bee4517dd54?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
    },
    {
      label: "NIN",
      value: "Identification Verification",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/adcf512a559427a5b1d7cd1258beff7433bb016d6879219580271ae29495b6f3?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
    },
    {
      label: "wdlsFairprice@gmail.com",
      value: "Email Address",
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/60dc7c3a82e80bc3f1ae72546e8c53320583965252ab1353e7634eac31366608?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GroceryGrabber</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.shopInfo}>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/f0536dd54c0fa564069230e9cbe9162cc80f4dad46a57a95c3d280c75ccccaad?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={styles.shopIcon}
        />
        <View style={styles.shopTextContainer}>
          <Text style={styles.shopName}>Woodlands FairPrice</Text>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/81c17d374f558d400eec5bd91bda0cf0f7996f7ba1fb35a18df637cd61bb6b12?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
            }}
            style={styles.shopArrowIcon}
          />
        </View>
      </View>
      <View style={styles.userRoleContainer}>
        <Text style={styles.userRole}>Super User</Text>
        <Text style={styles.addIcon}>+</Text>
      </View>
      <View style={styles.accountInfo}>
        <Text style={styles.accountText}>Account Number: 043423802</Text>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7cda674d4ee51c2bb31952b8b57cb209f7f6ad09235af94ccbce0c6f54a82313?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={styles.accountIcon}
        />
      </View>
      <TouchableOpacity
        style={styles.detailsContainer}
        onPress={() => Alert.alert("Account Name")}
      >
        <View style={styles.detailsContent}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/cb3055b52c711c964baebfa14021ffa66175a880d316d6f586c01d444a14d9ef?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
            }}
            style={styles.icon}
          />
          <View style={styles.detailsTextContainer}>
            <Text style={styles.detailsLabel}>@WoodlandsFairPrice</Text>
            <Text style={styles.detailsValue}>Account Name</Text>
          </View>
        </View>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/4531e17fc9b9aa9ba5b0d560e89007fc1b42d083d71e81a326dc7798bbffbba9?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.detailsContainer}
        onPress={() => Alert.alert("Address")}
      >
        <View style={styles.detailsContent}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1cf565bf3dad06c2be5c57cf4e1c241b1104ecb632b3e951c8dbf3844384274b?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
            }}
            style={styles.icon}
          />
          <View style={styles.detailsTextContainer}>
            <Text style={styles.detailsLabel}>Woodlands,Singapore</Text>
            <Text style={styles.detailsValue}>Address</Text>
          </View>
        </View>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/4531e17fc9b9aa9ba5b0d560e89007fc1b42d083d71e81a326dc7798bbffbba9?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.detailsContainer}
        onPress={() => Alert.alert("Phone number")}
      >
        <View style={styles.detailsContent}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/2713c55ad2ddbad7651a37d20e794db71308b94844ac73c32af76a17a6cd0de6?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
            }}
            style={styles.icon}
          />
          <View style={styles.detailsTextContainer}>
            <Text style={styles.detailsLabel}>+65 92350345</Text>
            <Text style={styles.detailsValue}>Phone number</Text>
          </View>
        </View>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/4531e17fc9b9aa9ba5b0d560e89007fc1b42d083d71e81a326dc7798bbffbba9?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>
      <UserInfoList data={userInfoData} />
      <View style={styles.footer}>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a3a3fe259f6c8ab64003e9294a1c9d48a6cd7609019165cce4a3a33a931cab1?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={styles.footerIcon}
        />
        <View style={styles.footerButton}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/30e3d31c19bd0f1572ad7b026331c9ca2f1456fef2f7240082d0d7f41419665f?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
            }}
            style={styles.footerButtonIcon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignSelf: "center",
    width: screenWidth < 480 ? "100%" : 480,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#4B5563",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  titleContainer: {
    alignSelf: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  divider: {
    height: 1,
    backgroundColor: "#D1D5DB",
    marginVertical: 10,
  },
  shopInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  shopIcon: {
    width: 50,
    height: 50,
  },
  shopTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  shopName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  shopArrowIcon: {
    width: 30,
    height: 30,
  },
  userRoleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  userRole: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  addIcon: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  accountInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  accountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6B7280",
  },
  accountIcon: {
    width: 25,
    height: 25,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginVertical: 5,
  },
  detailsContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsTextContainer: {
    marginLeft: 10,
  },
  detailsLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4338CA",
  },
  detailsValue: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginVertical: 5,
  },
  infoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoTextContainer: {
    marginLeft: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4338CA",
  },
  infoValue: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#4B5563",
  },
  footerIcon: {
    width: 38,
    height: 38,
    alignSelf: "center",
  },
  footerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#374151",
  },
  footerButtonIcon: {
    width: 36,
    height: 36,
  },
});

export default AdminProfile;
