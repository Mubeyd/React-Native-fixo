import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './src/screens/MainTab';
import RootStackScreen from './src/screens/RootStackScreen';
import { ActivityIndicator } from 'react-native-paper';

import { AuthContext } from './src/components/Context'




const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(false);

  const authContext = useMemo(() => ({
    signIn: () => {
      setUserToken(true);
      setIsLoading(false);
      console.log('signIn')
    },
    signOut: () => {
      setUserToken(false);
      setIsLoading(false);
      console.log('signOut');
    }
  }), []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
  }, [])


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color='#009387' />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken == ! null ? (
          <MainTab />
        ) : (
            <RootStackScreen />
          )
        }
      </NavigationContainer>

    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
