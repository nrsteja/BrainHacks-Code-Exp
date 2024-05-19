import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const home = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Home Page</Text>
      <Link href="/" style={{color: 'blue', textDecorationLine: 'underline'}}>Go back to login page</Link>
    </View>
  )
}

export default home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });