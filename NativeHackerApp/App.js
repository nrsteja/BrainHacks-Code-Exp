import React from 'react';
import { AppStack } from './app/navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  console.disableYellowBox = true; 
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
