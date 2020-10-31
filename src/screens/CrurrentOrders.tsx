import * as React from 'react'
import { View } from 'react-native'
import CurrentOrderCard from '../components/CurrentOrderCard'
import OrderCard from '../components/OrderCard'

const CrurrentOrders = () => {
    return (
        <View>
            {/* <OrderCard /> */}
            <CurrentOrderCard/>
        </View>
    )
}

export default CrurrentOrders
