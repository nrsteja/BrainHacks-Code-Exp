import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Alert, Animated, StyleSheet } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from '../general components/Button';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const Login = () => {
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isLoginDisabled, setIsLoginDisabled] = useState(true);
    const emailErrorAnim = useRef(new Animated.Value(0)).current;
    const passwordErrorAnim = useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();

    useEffect(() => {
        setIsLoginDisabled(!(email && password && !emailError && !passwordError));
    }, [email, password, emailError, passwordError]);

    useEffect(() => {
        Animated.timing(emailErrorAnim, {
            toValue: emailError ? 1 : 0,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [emailError]);

    useEffect(() => {
        Animated.timing(passwordErrorAnim, {
            toValue: passwordError ? 1 : 0,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [passwordError]);

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
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

    const handleEmailChange = (email) => {
        setEmail(email);
        if (email.length === 0) {
            setEmailError('');
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (password) => {
        setPassword(password);
        if (password.length === 0) {
            setPasswordStrength(0);
            setPasswordError('');
        } else if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
        } else {
            setPasswordError('');
        }
    };

    const handleLogin = () => {
        if (!email || !password || emailError || passwordError) {
            Alert.alert('Invalid Input', 'Please fill in both email and password fields correctly before proceeding.');
        } else {
            // Proceed with login
            Alert.alert('Login Successful', 'You have successfully logged in!');
        }
    };
    
    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 1:
            case 2:
                return 'red';
            case 3:
            case 4:
                return 'orange';
            case 5:
                return 'green';
            default:
                return 'gray';
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Hi Welcome Back ! 👋
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Hello again you have been missed!</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: emailError ? 'red' : COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "90%"
                            }}
                            value={email}
                            onChangeText={handleEmailChange}
                        />
                        {email.length > 0 && !emailError && (
                            <FontAwesome name="check-circle" size={24} color="green" />
                        )}
                    </View>
                    {emailError ? (
                        <Animated.Text style={{ color: 'red', opacity: emailErrorAnim }}>
                            {emailError}
                        </Animated.Text>
                    ) : null}
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: passwordError ? 'red' : COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "85%"
                            }}
                            value={password}
                            onChangeText={handlePasswordChange}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                marginRight: 12
                            }}
                        >
                            {
                                isPasswordShown ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.strengthBar, { backgroundColor: getPasswordStrengthColor(), width: `${(passwordStrength / 5) * 100}%` }]} />
                    {passwordError ? (
                        <Animated.Text style={{ color: 'red', opacity: passwordErrorAnim }}>
                            {passwordError}
                        </Animated.Text>
                    ) : null}
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>Remember Me</Text>
                </View>

                <Button
                    title="Login"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={handleLogin}
                    disabled={isLoginDisabled}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../../assets/adaptive-icon.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../../assets/adaptive-icon.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account? </Text>
                    <Pressable
                        onPress={() => {
                            console.log("Button pressed");
                            navigation.navigate("Search")
                        }}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    strengthBar: {
        height: 4,
        borderRadius: 4,
        marginTop: 4,
        backgroundColor: 'gray'
    }
});

export default Login;

