import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import SplashScreen from 'react-native-splash-screen';
import Permissions from 'react-native-permissions'
import useUser from './src/hooks/useUser';
import Settings from './src/containers/Settings';
import Locale from './src/containers/Locale';
import Providers from './src/navigation/Providers';


const App = () => {

  useUser()

  useEffect(() => {
    SplashScreen.hide()
      ; (async () => {
        // for later
        // await Permissions.request(Permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        // await Permissions.request(Permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        // await Permissions.request(Permissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        // await Permissions.request(Permissions.PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
      })()
  }, [])

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500)
  }, [])


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color='#009387' />
      </View>
    )
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Settings>
        <Locale>
          <Providers />
        </Locale>
      </Settings>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
