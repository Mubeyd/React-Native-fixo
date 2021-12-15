import * as React from 'react'
import { ScrollView, View } from 'react-native'
import CurrentOrderCard from '../components/CurrentOrderCard'
import OrderCard from '../components/OrderCard'
import { markers } from '../models/mapData';


const CurrentOrders = () => {
    return (
        <ScrollView>
            {markers.map((marker, index) => (
                <CurrentOrderCard
                    key={index}
                    name={marker.title}
                    imageSource={marker.image}
                    ratings={marker.rating}
                    reviews={marker.reviews}
                    price={marker.price}
                    description1={marker.description1}
                    description2={marker.description2}
                    orderState={marker.orderState}
                />
            ))}
        </ScrollView>
    )
}

export default CurrentOrders
