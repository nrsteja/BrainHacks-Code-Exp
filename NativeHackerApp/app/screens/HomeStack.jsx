import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, Platform, View, Dimensions } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import Search from './Search';
import Itinerary from './Itinerary';
import Maps from './Maps';
import Account from './Account';
import Home from './Home';
import COLORS from "../constants/colors"
import { SupermarketsProvider } from './MapContext';
import ListItems from './ListItems';

const Tab = createBottomTabNavigator();
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 0.1 * height,
    backgroundColor: "#619f75"
  },
}

export default function HomeStack() {
  return (
    <SupermarketsProvider>
    <Tab.Navigator screenOptions = {screenOptions} initialRouteName={"Home"}>
      <Tab.Screen 
      name = "Home" 
      component = {Home} 
      options={{ headerShown: false, 
      tabBarIcon: ({focused}) => {
        return(
          <View style = {{alignItems: "center", justifyContent: "center"}}>
            <Entypo name = "home" size = {0.06 * width} color = {focused ? COLORS.white : COLORS.black}/>
            <Text style = {{fontSize: 0.03 * width, color: ""}}>HOME</Text>
          </View>
        )
      } 
    }} />
      <Tab.Screen 
      name= "Search" 
      component = {Search} 
      options={{ headerShown: false,
        tabBarIcon: ({focused}) => {
          return(
            <View style = {{alignItems: "center", justifyContent: "center"}}>
              <Entypo name = "magnifying-glass" size = {0.06 * width} color = {focused ? COLORS.white : COLORS.black} />
              <Text style = {{fontSize: 0.03 * width, color: ""}}>SEARCH</Text>
            </View>
          )
        }  
        }}/>
      <Tab.Screen 
      name= "Maps" 
      component = {Maps} 
      options={{ headerShown: false,
        tabBarIcon: ({focused}) => {
          return(
            <View style = {{
              top: Platform.OS == "ios" ? -0.04 * height : -0.04 * height,
              width: Platform.OS == "ios" ? 0.2 * width: 0.22 * width,
              height: Platform.OS == "ios" ? 0.2 * width: 0.2 * width,
              borderRadius: 0.5 * width,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#90dfaa"
            }}>
              <FontAwesome name = "compass" size = {0.12 * width} color = {focused ? COLORS.white : COLORS.black}/>
            </View>
          )
        } 
        }}/>
      <Tab.Screen 
      name= "Itinerary" 
      component = {Itinerary} 
      options={{ headerShown: false, 
        tabBarIcon: ({focused}) => {
          return(
            <View style = {{alignItems: "center", justifyContent: "center"}}>
              <Entypo name = "menu" size = {0.06 * width} color = {focused ? COLORS.white : COLORS.black} />
              <Text style = {{fontSize: 0.03 * width, color: ""}}>INVENTORY</Text>
            </View>
          )
        } 
      }}
      />
      <Tab.Screen 
      name= "Account" 
      component = {Account} 
      options={{ headerShown: false, 
        tabBarIcon: ({focused}) => {
          return(
            <View style = {{alignItems: "center", justifyContent: "center"}}>
              <Entypo name = "globe" size = {0.06 * width} color = {focused ? COLORS.white : COLORS.black} />
              <Text style = {{fontSize: 0.03 * width, color: ""}}>PROFILE</Text>
            </View>
          )
        } }}/>
    </Tab.Navigator>
    </SupermarketsProvider>
  );
}