import React from 'react'
import { View,ScrollView, Text } from 'react-native'
import CurrentOrderCard from '../components/CurrentOrderCard'
import OrderCard from '../components/OrderCard'

const PastOrders = () => {
    return (
        <ScrollView>
            <OrderCard />
            <CurrentOrderCard
                name='muhammed ubeyd'
                logo='adduser'
                ratings={4}
                reviews={44}
                price={90}
                description='description pseojrw sliefh slkhef ijeri'
                orderState='waiting'
            />
        </ScrollView>
    )
}

export default PastOrders
