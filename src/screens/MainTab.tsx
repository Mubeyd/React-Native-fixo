import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Services from './Services';
import MyOrder from './MyOrders'
import Profile from './Profile';
import Settings from './Settings';


const Tab = createMaterialBottomTabNavigator();

const MainTab = () => (
    <Tab.Navigator
        initialRouteName="Services"
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
            name="Services"
            component={Services}
            options={{
                tabBarLabel: 'Services',
                tabBarColor: '#36A7E7',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-construct-sharp" color={color} size={24} />
                ),
            }}
        />

        <Tab.Screen
            name="Profile"
            component={Profile}
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
