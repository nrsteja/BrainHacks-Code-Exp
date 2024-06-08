import * as React from "react";
import { Dimensions, View, StyleSheet, Image, Text, TextInput, Pressable, SafeAreaView, Touchable, Button} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Hoshi } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import COLORS from "../constants/colors"

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const scale = width / 200;

const MyComponent = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style ={{flex: 1}}>
      <View style = {{
        flex: 0.1, 
        backgroundColor: COLORS.green,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"}}>
        <Text style = {{
          color: COLORS.white,
          fontSize: 32,
          fontWeight: "700",
          fontFamily: "Kanit, sans-serif",
        }}>GroceryGrabber</Text>
      </View>
      <View style = {{flex: 0.1, justifyContent: "flex-end", alignItems: "center", marginBottom: 0.02 * height}}>
        <Text style = {{fontSize: 15 * scale, fontFamily: "Kanit, sans-serif", fontWeight: "700"}}>Create Your Account</Text>
      </View>
      <View style = {{flex: 0.5, marginHorizontal: 0.05 * width}}>
        <View style = {{flex: 0.25, justifyContent: "center", alignItems: "center"}}>
        <Hoshi
          label={'Name'}
          borderColor={COLORS.green}
          inputPadding={0}
          backgroundColor={COLORS.white}
          style={{ width: 0.85 * width}}
          labelStyle={{ marginTop: -0.015 * height, marginHorizontal: 0.02 * width, fontSize: 8 * scale }}
        />
        </View>
        <View style = {{flex: 0.25, justifyContent: "center", alignItems: "center"}}>
          <Hoshi
            label={'Email'}
            borderColor={COLORS.green}
            inputPadding={0}
            backgroundColor={COLORS.white}
            style={{ width: 0.85 * width }}
            labelStyle={{ marginTop: -0.015 * height, marginHorizontal: 0.02 * width, fontSize: 8 * scale }}
          />
        </View>
        <View style = {{flex: 0.25, justifyContent: "center", alignItems: "center"}}>
          <Hoshi
            label={'Password'}
            borderColor={COLORS.green}
            inputPadding={0}
            backgroundColor={COLORS.white}
            style={{ width: 0.85 * width }}
            labelStyle={{ marginTop: -0.015 * height, marginHorizontal: 0.02 * width, fontSize: 8 * scale }}
          />
        </View>
        <View style = {{flex: 0.25, justifyContent: "center", alignItems: "center"}}>
          <Hoshi
            label={'Confirm Password'}
            borderColor={COLORS.green}
            inputPadding = {0}
            backgroundColor={COLORS.white}
            style={{ width: 0.85 * width }}
            labelStyle={{ marginTop: -0.015 * height, marginHorizontal: 0.02 * width, fontSize: 8 * scale }}
            secureTextEntry = "true"
          />
        </View>
      </View>
      <View style = {{flex: 0.05, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingHorizontal: 0.1 * width}}>
        <BouncyCheckbox style = {{flex: 0.1}}></BouncyCheckbox>
        <Text style = {{flex: 0.9}}>I understood the terms & policy.</Text>
      </View>
      <View style = {{flex: 0.25, justifyContent: "flex-start", alignItems: "center", paddingHorizontal: 0.1 * width}}>
        <TouchableOpacity style = {{
          backgroundColor: COLORS.dark_green,
          width: 0.8 * width,
          height: 0.05 * height,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 0.01 * height
        }} onPress={() => navigation.navigate('HomeStack')}>
          <Text style = {{
            fontWeight: 500,
            color: "white"
          }}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style = {{
          fontSize: 0.04 * width,
          marginBottom: 0.01 * height
        }}>Or Sign Up With</Text>
        <View style = {{flexDirection: "row"}}>
          <TouchableOpacity style = {{width: 0.2 * width, height: 0.05 * height, backgroundColor: "white", marginHorizontal: 0.04 * width, borderRadius: 1000, justifyContent: "center", alignItems: "center"}}>
            <Image resizeMode = "contain" style = {{resizeMode: "contain", width: "80%", height: "80%"}}source = {require('../../assets/google.png')}/>
          </TouchableOpacity >
          <TouchableOpacity style = {{width: 0.2 * width, height: 0.05 * height, backgroundColor: "white", marginHorizontal: 0.04 * width, borderRadius: 1000, justifyContent: "center", alignItems: "center"}}>
            <Image resizeMode = "contain" style = {{resizeMode: "contain", width: "80%", height: "80%"}}source = {require('../../assets/facebook.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style = {{width: 0.2 * width, height: 0.05 * height, backgroundColor: "white", marginHorizontal: 0.04 * width, borderRadius: 1000, justifyContent: "center", alignItems: "center"}}>
            <Image resizeMode = "contain" style = {{resizeMode: "contain", width: "80%", height: "80%"}}source = {require('../../assets/twitter.png')}/>
          </TouchableOpacity>
        </View>
        <View style = {{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Text style = {{fontSize: 0.04 * width}}>Have an account?</Text>
          <Button title = "Sign In" onPress={() => navigation.navigate('Login')}></Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const LabelInputPair = ({ label, placeholder, secureTextEntry = false }) => {
  const id = label.toLowerCase().replace(" ", "-");
  return (
    <>
      <Text style={styles.inputLabel} htmlFor={id}>
        {label}
      </Text>
      <TextInput
        id={id}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.inputField}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    display: "flex",
    maxWidth: 480,
    width: "100%",
    paddingBottom: 80,
    flexDirection: "column",
    alignItems: "stretch",
    margin: "0 auto",
  },
  header: {
    backgroundColor: COLORS.green,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.2
  },
  headerText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "Kanit, sans-serif",
  },
  formContainer: {
    display: "flex",
    marginTop: 14,
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 14,
    paddingRight: 51,
  },
  icon: {
    borderColor: COLORS.black,
    borderWidth: 2,
    width: 19,
    aspectRatio: "1.59",
  },
  title: {
    color: COLORS.black,
    marginTop: 66,
    fontSize: 27,
    fontWeight: "600",
    fontFamily: "Poppins, sans-serif",
    justifyContent: "center",
    alignItems: "center"
  },
  fieldContainer: {
    marginTop: 34,
    marginBottom: 16,
    width: "100%",
  },
  inputLabel: {
    color: COLORS.grey,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 13,
    marginLeft: 37,
    fontFamily: "Poppins, sans-serif",
  },
  inputField: {
    alignSelf: "end",
    width: 288,
    maxWidth: "100%",
    backgroundColor: COLORS.white,
    color: "#888",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 13,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 18,
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.dark_green,
    gap: 9,
  },
  checkbox: {
    width: 13,
    height: 13,
    borderColor: "rgba(0, 177, 64, 1)",
    borderWidth: 1,
    borderRadius: 1,
  },
  termsText: {
    fontFamily: "Poppins, sans-serif",
  },
  termsLink: {
    color: "rgba(0,177,64,1)",
  },
  submitButton: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 288,
    backgroundColor: COLORS.dark_green,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 60,
    marginTop: 17,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
  },
  orText: {
    color: "#888",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 25,
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 15,
    justifyContent: "center",
    marginTop: 19,
  },
  socialIcon: {
    borderRadius: 5,
    width: 86,
    height: 42,
    aspectRatio: 2.04,
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    gap: 7,
    marginTop: 26,
    fontFamily: "Poppins, sans-serif",
  },
  signInText: {
    color: "#888",
    fontSize: 16,
    fontWeight: "400",
  },
  signInLink: {
    color: COLORS.dark_green,
    fontSize: 16,
    fontWeight: "400",
  },
  imageStyle: {
    strokeWidth: 17,
    stroke: COLORS.black,
    borderColor: "rgba(0, 0, 0, 1)",
    borderStyle: "solid",
    borderWidth: 2,
    position: "relative",
    maxWidth: 17,
    aspectRatio: 1.69,
  }
});

export default MyComponent;