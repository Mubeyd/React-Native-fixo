import * as React from 'react'
import { ScrollView, View } from 'react-native'
import CurrentOrderCard from '../components/CurrentOrderCard'
import OrderCard from '../components/OrderCard'

const CrurrentOrders = () => {
    return (
        <ScrollView>
            {/* <OrderCard /> */}
            <CurrentOrderCard/>
        </ScrollView>
    )
}

export default CrurrentOrders
