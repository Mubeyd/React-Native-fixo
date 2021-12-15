import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import CurrentOrderCard from '../components/CurrentOrderCard'
import OrderCard from '../components/OrderCard'
import { markers } from '../models/mapData'

const PastOrders = () => {

    const filtered = markers.filter(function(el, index) {
        // normally even numbers have the feature that number % 2 === 0;
        // JavaScript is, however, zero-based, so want those elements with a modulo of 1:
        return index % 2 === 1;
      });

    return (
        <ScrollView>
            {filtered.map((marker, index) => (
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

export default PastOrders
