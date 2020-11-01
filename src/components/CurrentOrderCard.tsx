import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { space } from '../config/styleConstants'
import StarRating from './StartRating'

interface Props {
    name: string
    logo: string
    ratings: number
    reviews: number
    price: number
    description: string
    orderState: 'waiting' | 'processing' | 'cancelled' | 'done'
}
const CurrentOrderCard = (props: Props) => {

    let color = '#ffffff'

    if (props.orderState === 'waiting') {
        color = '#fcba03'
    } else if (props.orderState === 'processing') {
        color = '#00a0fc'
    } else if (props.orderState === 'cancelled') {
        color = '#ff0000'
    } else if (props.orderState === 'done') {
        color = '#00ff11'
    }


    return (
        <View style={styles.conatiner}>
            <ImageBackground
                style={styles.gradientImage}
                source={require('../assets/icons/orderscomp.png')}
            >
                <View style={styles.columnLeft}>
                    <AntDesign name={props.logo} size={64} color='#c2cacf' />
                    <Text style={styles.userName}>{props.name}</Text>
                    <StarRating ratings={props.ratings} reviews={props.reviews} />
                    <Text style={styles.price}>Estimated Price : {props.price}$</Text>
                </View>

                <View style={styles.columnRight}>
                    <View style={styles.explainTextView}>
                        <Text numberOfLines={2} style={styles.explainText}>
                            {props.description}
                        </Text>
                        <Text numberOfLines={2} style={styles.explainText}>
                            {props.description}
                        </Text>
                    </View>

                    <View style={styles.buttonsView}>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={[styles.orderStateTouch, { backgroundColor: color, }]}
                        >
                            <Text> {props.orderState} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { }}
                            style={styles.detailsTouch}
                        >
                            <Text> Details </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default CurrentOrderCard

const styles = StyleSheet.create({
    conatiner: {
        borderRadius: 15,
        margin: space * 1,
        backgroundColor: '#fff',
        height: 220,
        elevation: 3,
        width: '90%',
        alignSelf: 'center'
    },
    gradientImage: {
        flex: 1,
        resizeMode: "stretch",
        flexDirection: 'row',
        borderRadius: 15,
    },
    columnLeft: {
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 12,
        marginBottom: 12
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 24
    },
    price: {
        fontWeight: 'bold',
    },
    columnRight: {
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 18,
        marginRight: 6,
        marginBottom: 0
    },
    explainTextView: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    explainText: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 12,
        color: '#36A7E7',
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    orderStateTouch: {
        // backgroundColor: '#b4a3f7',
        padding: 5,
        borderRadius: 6,
    },
    detailsTouch: {
        backgroundColor: '#f7a3a3',
        padding: 5,
        borderRadius: 6,
        marginRight: 6,
    },
})
