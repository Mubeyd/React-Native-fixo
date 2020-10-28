import React from 'react'
import { View, Text } from 'react-native'
import OrderCard from '../components/OrderCard'

const PastOrders = () => {
    return (
        <View>
            <Text>PastOrders</Text>
            <OrderCard />
            <OrderCard />
        </View>
    )
}

export default PastOrders
