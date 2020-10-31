import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CrurrentOrders from './CrurrentOrders';
import PastOrders from './PastOrders';

const Tab = createMaterialTopTabNavigator();

const OrdersTabs = () => {

    return (
        <Tab.Navigator
            initialRouteName='CrurrentOrders'
            backBehavior='initialRoute'
            tabBarPosition='top'
            swipeEnabled={true}
            swipeVelocityImpact={0.2}
            springVelocityScale={0}
            sceneContainerStyle={{ backgroundColor: '#ffffff', margin: 10, borderRadius: 20 }}
            style={{ backgroundColor: '#ffffff' }}
            tabBarOptions={{
                activeTintColor: '#ffffff',
                inactiveTintColor: '#36A7E7',
                showIcon: true,
                pressColor: '#9BC9E2',
                scrollEnabled: false,
                tabStyle: {
                    borderRadius: 30,
                    margin: 12,
                    justifyContent: 'center',
                    alignContent: 'center'
                },
                indicatorStyle: {
                    backgroundColor: '#36A7E7',
                    height: '80%',
                    borderRadius: 30,
                    marginBottom: 8,
                    marginLeft: 12,
                    width: '45%'
                },
                style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 36,
                    margin: 24,
                    height: 76,
                    width: '90%'
                },
                labelStyle: { fontSize: 14 },

            }}
        >
            <Tab.Screen
                name="CrurrentOrders"
                component={CrurrentOrders}
            />
            <Tab.Screen
                name="PastOrders"
                component={PastOrders}
            />
        </Tab.Navigator>
    )
}

export default OrdersTabs