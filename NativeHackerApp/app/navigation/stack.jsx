import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Search from "../screens/Search";
import Home from "../screens/Home";
import Itenary from "../screens/Itenary";
import Account from "../screens/Account";
import Maps from "../screens/Maps";
import EditPage from "../screens/Admin/EditPage";
import Profile from "../screens/Admin/Profile";

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Itenary"
        component={Itenary}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Maps"
        component={Maps}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditPage"
        component={EditPage}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
