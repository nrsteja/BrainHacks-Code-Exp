import { createStackNavigator } from "@react-navigation/stack"
import Landing from "../screens/Landing";
import  Login  from "../screens/Login";
import Signup from "../screens/Signup";
import Search from "../screens/Search";

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName= "Landing">
            <Stack.Screen
            name="Landing"
            component={Landing}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen
            name="Login"
            component={Login}
            options={{
                headerShown: true
            }}
            />
            <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
                headerShown: true
            }}
            />
            <Stack.Screen
            name="Search"
            component={Search}
            options={{
                headerShown: true
            }}
            />
        </Stack.Navigator>
    );
}
