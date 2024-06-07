import { useNavigation } from "@react-navigation/native";
import { Dimensions, SafeAreaView, Platform } from "react-native";
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
console.log(windowHeight);

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

const RememberMe = () => (
  <View style={styles.rememberMeContainer}>
    <View style={styles.rememberMeOption}>
      <View style={styles.rememberMeCheckbox} />
      <Text>Remember me</Text>
    </View>
    <Text>Forgot password?</Text>
  </View>
);

const SignInButton = ({ text }) => (
  <TouchableOpacity style={styles.signInButton}>
    <Text style={styles.signInButtonText}>{text}</Text>
  </TouchableOpacity>
);

const GoogleSignIn = () => (
  <View style={styles.googleSignInContainer}>
    <Image
      source={{
        uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/065217c8a0d16a6ca1e660ef70df9999d9c1260c65643450f0cb4521b735f00b?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
      }}
      style={styles.googleSignInImage}
    />
    <Text style={styles.googleSignInText}>Or sign in with Google</Text>
  </View>
);

const SignUpPrompt = ({ navigation }) => (
  <View style={styles.signUpPromptContainer}>
    <Text style={styles.signUpPromptText}>Don't have an account?</Text>

    <Text
      onPress={() => navigation.navigate("Signup")}
      style={styles.signUpPromptLink}
    >
      Sign up now
    </Text>
  </View>
);

function Login() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, borderWidth: 5, borderColor: "red" }}>
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
            <RememberMe />
            <SignInButton text="Sign in" />
          </View>
          <View style={{ flex: 0.3 }}>
            <GoogleSignIn />
            <SignUpPrompt navigation={navigation} />
          </View>
        </SafeAreaView>
      </ImageBackground>
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
    flex: 0.6,
    alignItems: "center",
    paddingHorizontal: 16,
    borderWidth: 5,
    justifyContent: "space-between",
  },
  formContainer: {
    flex: 0.7,
    width: "100%",
    paddingBottom: "5%",
    paddingHorizontal: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
    borderWidth: 5,
    borderColor: "red",
  },
  inputFieldContainer: {
    marginTop: 12,
    borderWidth: 2,
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
    borderWidth: 1,
    backgroundColor: "#f4f4f5",
    borderColor: "#d1d5db",
    color: "#6b7280",
  },
  rememberMeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderWidth: 5,
  },
  rememberMeOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeCheckbox: {
    width: 24,
    height: 24,
    backgroundColor: "#6b7280",
    borderRadius: 12,
    marginRight: 8,
  },
  signInButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    backgroundColor: "#2563eb",
    borderRadius: 8,
  },
  signInButtonText: {
    color: "#fff",
  },
  googleSignInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingVertical: "2.5%",
    backgroundColor: "#27272a",
    borderRadius: 8,
  },
  googleSignInImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleSignInText: {
    color: "#fff",
  },
  signUpPromptContainer: {
    marginTop: "2%",

    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "red",
  },
  signUpPromptText: {
    color: "#4b5563",
    justifyContent: "center",
    borderWidth: 2,
  },
  signUpPromptLink: {
    color: "#000",
    justifyContent: "center",
    borderWidth: 2,
  },
});

export default Login;
