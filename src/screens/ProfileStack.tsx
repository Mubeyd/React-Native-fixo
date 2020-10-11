import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import EditSurname from './EditSurname';
import MainTab from './MainTab';
import Profile from './Profile';

const ProfileStack = () => {

const ProfileRootStack = createStackNavigator();

    return (
        <ProfileRootStack.Navigator 
        headerMode='none'
        initialRouteName="Profile">
            <ProfileRootStack.Screen name="ProfileTab" component={Profile}/>
            <ProfileRootStack.Screen name="EditSurname" component={EditSurname}/>
        </ProfileRootStack.Navigator>
        // <View>
        //     <Text></Text>
        // </View>
    )
}

export default ProfileStack

const styles = StyleSheet.create({})
