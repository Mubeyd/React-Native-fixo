import React from 'react'
import { View,ScrollView, Text } from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'
import CurrentOrderCard from '../components/CurrentOrderCard'
import OrderCard from '../components/OrderCard'

const PastOrders = () => {
    return (
        <ScrollView>
            {/* <OrderCard /> */}
            <CurrentOrderCard/>
            <CurrentOrderCard/>
            <CurrentOrderCard/>
            <CurrentOrderCard/>
        </ScrollView>
    )
}

export default PastOrders
