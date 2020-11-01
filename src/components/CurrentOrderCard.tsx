import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { space } from '../config/styleConstants'
import StarRating from './StartRating'

const CurrentOrderCard = () => {
    return (
        <View style={styles.conatiner}>
            <ImageBackground
                style={styles.gradientImage}
                source={require('../assets/icons/orderscomp.png')}
            >
                <View style={styles.columnLeft}>
                    <AntDesign name='github' size={64} color='#6274fc' />
                    <Text style={styles.userName}>Muhammed Ubeyd</Text>
                    <StarRating ratings={4} reviews={55} />
                    <Text style={styles.price}>Estimated Price : 75$</Text>
                </View>

                <View style={styles.columnRight}>
                    <View style={styles.explainTextView}>
                        <Text numberOfLines={2} style={styles.explainText}>
                            Lorem Ipsum is simply dummy ksjdfhs sdjeoir sljfs sjkdgf skjd ksjdf ksjf
                </Text>
                        <Text numberOfLines={2} style={styles.explainText}>
                            Lorem Ipsum is simply dummy
                </Text>
                    </View>

                    <View style={styles.buttonsView}>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={styles.orderStateTouch}
                        >
                            <Text> Order State </Text>
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
        backgroundColor: '#b4a3f7',
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
