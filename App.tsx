import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './src/screens/MainTab';
import RootStackScreen from './src/screens/RootStackScreen';




const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
      {/* <MainTab/> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
