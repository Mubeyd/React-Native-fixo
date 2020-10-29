import React from 'react'
import { View, Text } from 'react-native'
import OrderCard from '../components/OrderCard'

const PastOrders = () => {
    return (
        <View>
            <OrderCard />
            <OrderCard />
        </View>
    )
}

export default PastOrders
