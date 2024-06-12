import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "../screens/HomeStack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import CameraScreen from "../screens/CameraScreen";
import ListItems from "../screens/ListItems";
import Home from "../screens/Admin/AdminHome";
import Profile from "../screens/Admin/AdminProfile";
import { AdminStack } from "./AdminStack";
import { SupermarketsProvider } from "../screens/MapContext";
import ShowRecipe from "../screens/ShowRecipe"

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <SupermarketsProvider>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminStack"
        component={AdminStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="ListItems" component={ListItems} options={{ headerShown: false }} />
      <Stack.Screen name="ShowRecipe" component={ShowRecipe} />
    </Stack.Navigator>
    </SupermarketsProvider>
  );
};
