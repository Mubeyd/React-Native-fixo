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

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userNumber: null
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userNumber: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userNumber: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userNumber: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  }

  // const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

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
