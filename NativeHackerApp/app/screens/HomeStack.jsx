import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './Search';
import Itinerary from './Itinerary';
import Maps from './Maps';
import Account from './Account';
import Home from './Home';

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator initialRouteName={"Home"}>
      <Tab.Screen name = "Home" component = {Home} options={{ headerShown: false }} />
      <Tab.Screen name= "Search" component = {Search} options={{ headerShown: false }}/>
      <Tab.Screen name= "Maps" component = {Maps} options={{ headerShown: false }}/>
      <Tab.Screen name= "Itinerary" component = {Itinerary} options={{ headerShown: false }}/>
      <Tab.Screen name= "Account" component = {Account} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}