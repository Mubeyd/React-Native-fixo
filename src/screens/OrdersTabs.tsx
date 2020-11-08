import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CrurrentOrders from './CrurrentOrders';
import PastOrders from './PastOrders';
import { space } from '../config/styleConstants';

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
            sceneContainerStyle={{ backgroundColor: '#ffffff', margin: 0, }}
            style={{ backgroundColor: '#ffffff' }}
            tabBarOptions={{
                activeTintColor: '#ffffff',
                inactiveTintColor: '#36A7E7',
                showIcon: true,
                pressColor: '#9BC9E2',
                scrollEnabled: false,
                tabStyle: {
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignContent: 'center'
                },
                indicatorStyle: {
                    backgroundColor: '#36A7E7',
                    height: 48,
                    borderRadius: 30,
                    marginBottom: 6,
                    marginTop: 6,
                    marginLeft: 6,
                    marginRight: 0,
                    // margin: 6,
                    width: '45%'
                },
                style: {
                    backgroundColor: '#ffffff',
                    borderRadius: 36,
                    marginTop: space,
                    marginHorizontal: 24,
                    height: 58,
                    width: '90%'
                },
                labelStyle: {
                    fontSize: 14,
                    marginBottom: 0
                },

            }}
        >
            <Tab.Screen
                name="Crurrent Orders"
                component={CrurrentOrders}
            />
            <Tab.Screen
                name="Past Orders"
                component={PastOrders}
            />
        </Tab.Navigator>
    )
}

export default OrdersTabs