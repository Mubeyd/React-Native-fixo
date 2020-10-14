import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import MyOrder from './MyOrders'
import Settings from './Settings';
import ProfileStack from './ProfileStack';
import ServicesStack from './ServicesStack';


const Tab = createMaterialBottomTabNavigator();

const MainTab = () => (
    <Tab.Navigator
        initialRouteName="ServicesStack"
        activeColor="#fff"
    >
        <Tab.Screen
            name="MyOrder"
            component={MyOrder}
            options={{
                tabBarLabel: 'MyOrder',
                tabBarColor: '#009387',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-file-tray-stacked-sharp" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            name="ServicesStack"
            component={ServicesStack}
            options={{
                tabBarLabel: 'Services',
                tabBarColor: '#36A7E7',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-construct-sharp" color={color} size={24} />
                ),
            }}
        />

        <Tab.Screen
            name="ProfileStack"
            component={ProfileStack}
            options={{
                tabBarLabel: 'Profile',
                tabBarColor: '#694fad',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-person" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
                tabBarLabel: 'Settings',
                tabBarColor: '#d02860',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-options-sharp" color={color} size={24} />
                ),
            }}
        />
    </Tab.Navigator>
)
export default MainTab
