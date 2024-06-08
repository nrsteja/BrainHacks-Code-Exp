import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

const LabelInput = ({ label, placeholder, secureTextEntry }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.labelText}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.textInput}
      aria-label={label}
    />
  </View>
);

const handleSignUp = () => {
  Alert.alert("Sign Up", "You have signed up successfully!");
};

const Signup = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>GroceryGrabber</Text>
    </View>
    <View style={styles.content}>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/519a6e0013eb4acfc8a945d2f53f08e2907443c867e8e5626e223a04033e7bab?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
        }}
        style={styles.mainImage}
        resizeMode="contain"
      />
      <Text style={styles.createAccountText}>Create your account</Text>
      <View style={styles.form}>
        <LabelInput label="Name" placeholder="ex: jon smith" />
        <LabelInput label="Email" placeholder="ex: jon.smith@email.com" />
        <LabelInput label="Password" placeholder="*********" secureTextEntry />
        <LabelInput
          label="Confirm password"
          placeholder="*********"
          secureTextEntry
        />
        <View style={styles.termsContainer}>
          <View style={styles.checkbox} />
          <Text style={styles.termsText}>
            I understood the <Text style={styles.linkText}>terms & policy</Text>
            .
          </Text>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.signUpWithText}>or sign up with</Text>
      <View style={styles.socialContainer}>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/fc54c243f75e2f6e1df26bcb0b824a53e0d4f73bc8efee45a49e70b80d9c6b41?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={styles.socialIcon}
        />
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/9d0409fa56bbc1482a7ec8e467941571132a7ccd24eae2a80af5ca5fea233d3c?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={styles.socialIcon}
        />
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/04c68511902b52b98a416aad7bb1cbeaacd88ec0171bacb0e9da26dc9013b9af?apiKey=273a3e4505cd4e05ba15f44788b2ff1a&",
          }}
          style={styles.socialIcon}
        />
      </View>
      <View style={styles.signInContainer}>
        <Text style={styles.haveAccountText}>Have an account?</Text>
        <Text style={styles.signInText}>SIGN IN</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    marginHorizontal: "auto",
    width: "100%",
    backgroundColor: "white",
    maxWidth: 480,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "100%",
    backgroundColor: "#808080",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingRight: 12,
    paddingLeft: 3.5,
    marginTop: 3.5,
    width: "100%",
  },
  mainImage: {
    borderColor: "black",
    borderWidth: 2,
    aspectRatio: 1.59,
    width: 19,
  },
  createAccountText: {
    alignSelf: "flex-end",
    marginTop: 16,
    fontSize: 24,
    fontWeight: "600",
    color: "black",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 3.5,
  },
  labelText: {
    fontSize: 14,
    color: "#7D7D7D",
  },
  textInput: {
    paddingVertical: 3.5,
    paddingHorizontal: 4,
    marginTop: 3.5,
    width: "100%",
    maxWidth: "100%",
    fontSize: 14,
    backgroundColor: "#F1F1F1",
    borderRadius: 8,
    color: "#8C8C8C",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  checkbox: {
    width: 13,
    height: 13,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 2,
  },
  termsText: {
    fontSize: 10,
    color: "#4CAF50",
    marginLeft: 5,
  },
  linkText: {
    color: "#4CAF50",
  },
  signUpButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 4,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  signUpWithText: {
    marginTop: 6,
    fontSize: 14,
    color: "#8C8C8C",
    textAlign: "center",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    marginTop: 5,
    marginLeft: 9,
  },
  socialIcon: {
    width: 86,
    aspectRatio: 2.04,
    borderRadius: 8,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 7,
  },
  haveAccountText: {
    fontSize: 14,
    color: "#8C8C8C",
  },
  signInText: {
    fontSize: 14,
    color: "#4CAF50",
    marginLeft: 5,
  },
});

export default Signup;
