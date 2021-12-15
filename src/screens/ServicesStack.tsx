import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import Services from './Services'
import ServicesMap from './ServicesMap'

const ServicesStack = (navigation) => {
  // navigation.setOptions({ tabBarVisible: false })
  const ServicesRootStack = createStackNavigator()
  return (
    <ServicesRootStack.Navigator headerMode="none" initialRouteName="Services">
      <ServicesRootStack.Screen name="Services" component={Services} />
      <ServicesRootStack.Screen name="ServicesMap" component={ServicesMap} />
    </ServicesRootStack.Navigator>
  )
}

export default ServicesStack

const styles = StyleSheet.create({})
