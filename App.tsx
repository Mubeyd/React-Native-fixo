import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './src/screens/MainTab';




const App = () => {
  return (
    <NavigationContainer>
      <MainTab/>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
