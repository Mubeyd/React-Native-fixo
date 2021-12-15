import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Settings from './Settings'
import Privacy from './Privacy'
import Help from './Help'
import BeaFIXO from './BeaFIXO'


const SettingsStack = () => {
    const SettingsRootStack = createStackNavigator()

    return (
        <SettingsRootStack.Navigator
            headerMode='none'
            initialRouteName='Settings'>
            <SettingsRootStack.Screen name='Settings' component={Settings} />
            <SettingsRootStack.Screen name='Privacy' component={Privacy} />
            <SettingsRootStack.Screen name='Help' component={Help} />
            <SettingsRootStack.Screen name='BeaFIXO' component={BeaFIXO} />
        </SettingsRootStack.Navigator>
    )
}

export default SettingsStack

const styles = StyleSheet.create({})
