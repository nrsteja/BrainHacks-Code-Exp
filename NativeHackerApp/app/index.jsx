import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: 'red'}}>Login... (This is for test, login should be in login.jsx and not index)</Text>
      <StatusBar style="auto" />
      <Link href="/home" style={{color: 'blue', textDecorationLine: 'underline'}}>Go to Home Page</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
