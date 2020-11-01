import * as React from 'react'
import { ScrollView, View } from 'react-native'
import CurrentOrderCard from '../components/CurrentOrderCard'
import OrderCard from '../components/OrderCard'

const CrurrentOrders = () => {
    return (
        <ScrollView>
            {/* <OrderCard /> */}
            <CurrentOrderCard
                name='muhammed ubeyd'
                logo='github'
                ratings={4}
                reviews={44}
                price={75}
                description='description pseojrw sliefh slkhef ijeri'
                orderState='cancelled'
            />
            <CurrentOrderCard
                name='muhammed ubeyd'
                logo='android'
                ratings={4}
                reviews={44}
                price={50}
                description='description pseojrw sliefh slkhef ijeri'
                orderState='done'
            />
            <CurrentOrderCard
                name='muhammed ubeyd'
                logo='team'
                ratings={4}
                reviews={44}
                price={60}
                description='description pseojrw sliefh slkhef ijeri'
                orderState='processing'
            />
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

export default CrurrentOrders
