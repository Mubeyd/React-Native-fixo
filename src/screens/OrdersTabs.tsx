import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CrurrentOrders from './CrurrentOrders';
import PastOrders from './PastOrders';
import { View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const OrdersTabs = () => {
    return (
        // <View style={{ marginTop: 40 }}>
            <Tab.Navigator>
                <Tab.Screen name="CrurrentOrders" component={CrurrentOrders} />
                <Tab.Screen name="PastOrders" component={PastOrders} />
            </Tab.Navigator>
        // </View>
    )
}

export default OrdersTabs