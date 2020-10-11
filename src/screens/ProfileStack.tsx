import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { StyleSheet } from 'react-native'
import EditName from './EditName';
import EditSurname from './EditSurname';
import Profile from './Profile';

const ProfileStack = () => {

const ProfileRootStack = createStackNavigator();

    return (
        <ProfileRootStack.Navigator 
        headerMode='none'
        initialRouteName="Profile">
            <ProfileRootStack.Screen name="ProfileTab" component={Profile}/>
            <ProfileRootStack.Screen name="EditName" component={EditName}/>
            <ProfileRootStack.Screen name="EditSurname" component={EditSurname}/>
        </ProfileRootStack.Navigator>
        // <View>
        //     <Text></Text>
        // </View>
    )
}

export default ProfileStack

const styles = StyleSheet.create({})
