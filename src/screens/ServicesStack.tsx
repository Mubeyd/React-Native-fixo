import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Services from './Services'
import ServicesMap from './ServicesMap'

const ServicesStack = () => {

    const ServicesRootStack = createStackNavigator()
    return (
        <ServicesRootStack.Navigator
            headerMode='none'
            initialRouteName="ServicesMap">
            <ServicesRootStack.Screen name='Services' component={Services} />
            <ServicesRootStack.Screen name='ServicesMap' component={ServicesMap} />
        </ServicesRootStack.Navigator>
    )
}

export default ServicesStack

const styles = StyleSheet.create({})
