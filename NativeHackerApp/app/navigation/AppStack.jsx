import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "../screens/HomeStack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
// import CameraScreen from "../screens/CameraScreen";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      {/* <Stack.Screen name="CameraScreen" component={CameraScreen} /> */}
    </Stack.Navigator>
  );
};
