import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GigScreen from './components/GigScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <GigScreen />
      <StatusBar style="auto" />
    </View>
    </NavigationContainer>
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
