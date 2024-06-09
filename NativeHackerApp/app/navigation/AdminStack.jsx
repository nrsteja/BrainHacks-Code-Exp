import { createStackNavigator } from "@react-navigation/stack";
// import HomeStack from "../screens/HomeStack";
// import Login from "../screens/Login";
// import Signup from "../screens/Signup";
// import CameraScreen from "../screens/CameraScreen";
import AdminHome from "../screens/Admin/AdminHome";
import AdminProfile from "../screens/Admin/AdminProfile";

const Stack = createStackNavigator();

export const AdminStack = () => {
  return (
    <Stack.Navigator initialRouteName="AdminHome">
      <Stack.Screen
        name="AdminHome"
        component={AdminHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminProfile"
        component={AdminProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
