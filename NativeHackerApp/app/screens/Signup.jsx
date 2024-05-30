import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../general components/Button";
import { useNavigation } from "@react-navigation/native";
import CountryCodePicker from "../general components/CountryCodePicker";
import COLORS from "../constants/colors";

const Signup = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+65"); // Default to Singapore
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSignupDisabled, setIsSignupDisabled] = useState(true);
  const emailErrorAnim = useRef(new Animated.Value(0)).current;
  const usernameErrorAnim = useRef(new Animated.Value(0)).current;
  const mobileNumberErrorAnim = useRef(new Animated.Value(0)).current;
  const passwordErrorAnim = useRef(new Animated.Value(0)).current;
  const confirmPasswordErrorAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    setIsSignupDisabled(
      !(
        email &&
        username &&
        mobileNumber &&
        password &&
        confirmPassword &&
        !emailError &&
        !usernameError &&
        !mobileNumberError &&
        !passwordError &&
        !confirmPasswordError &&
        isChecked
      ),
    );
  }, [
    email,
    username,
    mobileNumber,
    password,
    confirmPassword,
    emailError,
    usernameError,
    mobileNumberError,
    passwordError,
    confirmPasswordError,
    isChecked,
  ]);

  useEffect(() => {
    Animated.timing(emailErrorAnim, {
      toValue: emailError ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [emailError]);

  useEffect(() => {
    Animated.timing(usernameErrorAnim, {
      toValue: usernameError ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [usernameError]);

  useEffect(() => {
    Animated.timing(mobileNumberErrorAnim, {
      toValue: mobileNumberError ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [mobileNumberError]);

  useEffect(() => {
    Animated.timing(passwordErrorAnim, {
      toValue: passwordError ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [passwordError]);

  useEffect(() => {
    Animated.timing(confirmPasswordErrorAnim, {
      toValue: confirmPasswordError ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [confirmPasswordError]);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(username);
  };

  const validateMobileNumber = (number) => {
    const regex = countryCode === "+65" ? /^\d{8}$/ : /^\d{10,15}$/;
    return regex.test(number);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    let strength = 0;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumber) strength++;
    if (hasSpecialChar) strength++;
    if (isLongEnough) strength++;

    setPasswordStrength(strength);

    return strength === 5;
  };

  const handleSignup = () => {
    if (
      validateEmail(email) &&
      validateUsername(username) &&
      validateMobileNumber(mobileNumber) &&
      validatePassword(password) &&
      password === confirmPassword
    ) {
      Alert.alert("Success", "You have signed up successfully");
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", "Please fill in all fields correctly.");
    }
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={200}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(validateEmail(text) ? "" : "Invalid email address");
            }}
            onBlur={() =>
              setEmailError(validateEmail(email) ? "" : "Invalid email address")
            }
          />
          <Animated.Text
            style={{ ...styles.errorText, opacity: emailErrorAnim }}
          >
            {emailError}
          </Animated.Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setUsernameError(
                validateUsername(text)
                  ? ""
                  : "Username can only contain letters, numbers, and underscores",
              );
            }}
            onBlur={() =>
              setUsernameError(
                validateUsername(username)
                  ? ""
                  : "Username can only contain letters, numbers, and underscores",
              )
            }
          />
          <Animated.Text
            style={{ ...styles.errorText, opacity: usernameErrorAnim }}
          >
            {usernameError}
          </Animated.Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.phoneContainer}>
            <CountryCodePicker
              selectedCountryCode={countryCode}
              setSelectedCountryCode={setCountryCode}
            />
            <TextInput
              style={styles.phoneInput}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={(text) => {
                setMobileNumber(text);
                setMobileNumberError(
                  validateMobileNumber(text) ? "" : "Invalid mobile number",
                );
              }}
            />
          </View>
          <Animated.Text
            style={{ ...styles.errorText, opacity: mobileNumberErrorAnim }}
          >
            {mobileNumberError}
          </Animated.Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={isPasswordShown}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError(
                  validatePassword(text)
                    ? ""
                    : "Please ensure your password is at least 8 characters long, includes at least one uppercase letter, one lowercase letter, one number, and one special character",
                );
              }}
              onBlur={() =>
                setPasswordError(
                  validatePassword(password)
                    ? ""
                    : "Please ensure your password is at least 8 characters long, includes at least one uppercase letter, one lowercase letter, one number, and one special character",
                )
              }
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsPasswordShown(!isPasswordShown)}
            >
              <Ionicons
                name={isPasswordShown ? "eye-off" : "eye"}
                size={24}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </View>
          <Animated.Text
            style={{ ...styles.errorText, opacity: passwordErrorAnim }}
          >
            {passwordError}
          </Animated.Text>
          <View style={styles.passwordStrengthBarContainer}>
            <View
              style={[
                styles.passwordStrengthBar,
                passwordStrength >= 1
                  ? { backgroundColor: "red" }
                  : { backgroundColor: "#e0e0e0" },
              ]}
            />
            <View
              style={[
                styles.passwordStrengthBar,
                passwordStrength >= 2
                  ? { backgroundColor: "orange" }
                  : { backgroundColor: "#e0e0e0" },
              ]}
            />
            <View
              style={[
                styles.passwordStrengthBar,
                passwordStrength >= 3
                  ? { backgroundColor: "yellow" }
                  : { backgroundColor: "#e0e0e0" },
              ]}
            />
            <View
              style={[
                styles.passwordStrengthBar,
                passwordStrength >= 4
                  ? { backgroundColor: "yellowgreen" }
                  : { backgroundColor: "#e0e0e0" },
              ]}
            />
            <View
              style={[
                styles.passwordStrengthBar,
                passwordStrength >= 5
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "#e0e0e0" },
              ]}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              secureTextEntry={isConfirmPasswordShown}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setConfirmPasswordError(
                  text === password ? "" : "Passwords do not match",
                );
              }}
              onBlur={() =>
                setConfirmPasswordError(
                  confirmPassword === password ? "" : "Passwords do not match",
                )
              }
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
            >
              <Ionicons
                name={isConfirmPasswordShown ? "eye-off" : "eye"}
                size={24}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </View>
          <Animated.Text
            style={{ ...styles.errorText, opacity: confirmPasswordErrorAnim }}
          >
            {confirmPasswordError}
          </Animated.Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={styles.checkboxText}>
            I agree to the Terms and Conditions
          </Text>
        </View>
        <Button
          title="Sign Up"
          onPress={handleSignup}
          disabled={isSignupDisabled}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginLink}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
        {/* <View style={{ height: 80 }} /> */}
      </SafeAreaView>
      </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneInput: {
    flex: 1,
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginLeft: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  passwordStrengthBarContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  passwordStrengthBar: {
    flex: 1,
    height: 5,
    marginHorizontal: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxText: {
    marginLeft: 8,
    color: COLORS.black,
  },
  loginLink: {
    marginTop: 16,
    alignItems: "center",
  },
  loginLinkText: {
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default Signup;
