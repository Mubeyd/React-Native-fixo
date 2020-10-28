import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import MyOrder from './MyOrders'
import Settings from './Settings';
import ProfileStack from './ProfileStack';
import ServicesStack from './ServicesStack';
import OrdersTabs from './OrdersTabs';


const Tab = createMaterialBottomTabNavigator();

const getTabBarVisibility = (route) => {
    const routeName = route.state
        ? route.state.routes[route.state.index].name
        : '';

    if (routeName === 'ServicesMap') {
        return false;
    }

    return true;
}
const MainTab = () => (
    
    <Tab.Navigator
        initialRouteName="OrdersTabs"
        activeColor="#fff"
    >
        <Tab.Screen
            name="MyOrder"
            component={OrdersTabs}
            options={{
                tabBarLabel: 'OrdersTabs',
                tabBarColor: '#36A7E7',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-file-tray-stacked-sharp" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            name="ServicesStack"
            component={ServicesStack}
            options={({ route }) => ({
                    // tabBarVisible: getTabBarVisibility(route), /// for later
                    tabBarLabel: 'Services',
                    tabBarColor: '#36A7E7',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-construct-sharp" color={color} size={24} />
                    ),
                })}
        />

        <Tab.Screen
            name="ProfileStack"
            component={ProfileStack}
            options={{
                tabBarLabel: 'Profile',
                tabBarColor: '#36A7E7',
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
                tabBarColor: '#36A7E7',
                tabBarIcon: ({ color }) => (
                    <Icon name="ios-options-sharp" color={color} size={24} />
                ),
            }}
        />
    </Tab.Navigator>
)
export default MainTab
