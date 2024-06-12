import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  SafeAreaView,
  Platform,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import COLORS from "../constants/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const InputField = ({ label, placeholder, secureTextEntry }) => (
  <View style={styles.inputFieldContainer}>
    <Text style={styles.srOnly}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      accessibilityLabel={label}
      style={styles.textInput}
    />
  </View>
);

const RememberMe = ({ isChecked, onToggle }) => (
  <View style={styles.rememberMeContainer}>
    <TouchableOpacity style={styles.rememberMeOption} onPress={onToggle}>
      <View
        style={[
          styles.rememberMeCheckbox,
          isChecked && styles.rememberMeChecked,
        ]}
      >
        {isChecked && <Text style={styles.rememberMeTick}>✓</Text>}
      </View>
      <Text>Remember me</Text>
    </TouchableOpacity>
    <Button title="Forgot password?"></Button>
  </View>
);

const SignInButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.signInButton} onPress={onPress}>
    <Text style={styles.signInButtonText}>{text}</Text>
  </TouchableOpacity>
);

const GoogleSignIn = ({ navigation }) => (
  <TouchableOpacity style={styles.googleSignInContainer}>
    <Image
      source={require("../../assets/google.png")}
      style={styles.googleSignInImage}
      resizeMode="contain"
    />
    <Text
      style={styles.googleSignInText}
      onPress={() => navigation.navigate("AdminHome")}
    >
      Or sign in with Google
    </Text>
  </TouchableOpacity>
);

const SignUpPrompt = ({ navigation }) => (
  <View style={styles.signUpPromptContainer}>
    <Text style={styles.signUpPromptText}>Don't have an account?</Text>
    <Text
      onPress={() => navigation.navigate("Signup")}
      style={styles.signUpPromptLink}
    >
      Sign Up Now
    </Text>
  </View>
);

function Login() {
  const navigation = useNavigation();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <ImageBackground
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/838485a2e58427926bfd76783e93dcecc690e4e96073aa11272a2c82be1b4d5b?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
            }}
            style={{ flex: 1 }}
          >
            <View style={styles.logoContainer}>
              <Image
                source={{
                  uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f297d4157515fd7ed15788f8b23881d06f2f39d15b5fb7ae8e736caf9d91c9c?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
                }}
                style={styles.logoImage}
              />
            </View>
            <SafeAreaView style={styles.container}>
              <View style={styles.formContainer}>
                <InputField
                  label="Email or phone number"
                  placeholder="Email or phone number"
                  secureTextEntry={false}
                />
                <InputField
                  label="Enter password"
                  placeholder="Enter password"
                  secureTextEntry={true}
                />
                <RememberMe
                  isChecked={rememberMe}
                  onToggle={() => setRememberMe(!rememberMe)}
                />
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      { backgroundColor: isAdmin ? COLORS.grey : COLORS.blue },
                    ]}
                    onPress={() => setIsAdmin(false)}
                  >
                    <Text style={styles.toggleButtonText}>User</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      { backgroundColor: isAdmin ? COLORS.blue : COLORS.grey },
                    ]}
                    onPress={() => setIsAdmin(true)}
                  >
                    <Text style={styles.toggleButtonText}>Supermarket</Text>
                  </TouchableOpacity>
                </View>
                <SignInButton
                  text="Sign in"
                  onPress={() => {
                    if (isAdmin) {
                      navigation.replace("AdminStack");
                    } else {
                      navigation.replace("HomeStack");
                    }
                  }}
                />
              </View>
              <View style={{ flex: 0.3, width: "80%" }}>
                <GoogleSignIn navigation={navigation} />
                <SignUpPrompt navigation={navigation} />
              </View>
            </SafeAreaView>
          </ImageBackground>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 0.4,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoImage: {
    width: "90%",
    height: "50%",
    resizeMode: "contain",
    marginBottom: "2%",
  },
  container: {
    flex: 0.5,
    alignItems: "center",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  formContainer: {
    flex: 0.7,
    width: "100%",
    paddingBottom: "5%",
    paddingHorizontal: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
  },
  inputFieldContainer: {
    marginTop: 12,
  },
  srOnly: {
    position: "absolute",
    left: -9999,
  },
  textInput: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    lineHeight: 20,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey,
    color: COLORS.grey,
    borderWidth: 1,
  },
  rememberMeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  rememberMeOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeCheckbox: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.grey,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  rememberMeChecked: {
    backgroundColor: COLORS.blue,
  },
  rememberMeTick: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  signInButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: COLORS.blue,
    borderRadius: 8,
    height: windowHeight * 0.06,
  },
  signInButtonText: {
    color: COLORS.white,
    fontSize: windowWidth * 0.045,
  },
  googleSignInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "4%",
    backgroundColor: COLORS.black,
    borderRadius: 8,
    marginTop: 12,
  },
  googleSignInImage: {
    resizeMode: "contain",
    width: "10%",
    height: "100%",
  },
  googleSignInText: {
    color: COLORS.white,
    marginLeft: 8,
    fontSize: windowWidth * 0.045,
  },
  signUpPromptContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpPromptText: {
    color: "#4b5563",
  },
  signUpPromptLink: {
    color: "#000",
    marginLeft: 4,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  toggleButtonText: {
    color: COLORS.white,
    fontSize: windowWidth * 0.045,
  },
});

export default Login;
