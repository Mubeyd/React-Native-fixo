import { wrap } from 'lodash'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { space } from '../config/styleConstants'
import StarRating from './StartRating'

const CurrentOrderCard = () => {
    return (
        <View style={styles.conatiner}>
            <View style={styles.columnLeft}>
                <AntDesign name='github' size={64} color='#6274fc' />
                <Text>Muhammed Ubeyd</Text>
                <StarRating ratings={4} reviews={55} />
                <Text>Price : 75$</Text>
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
        </View>
    )
}

export default CurrentOrderCard

const styles = StyleSheet.create({
    conatiner: {
        borderRadius: 15,
        margin: space * 1,
        backgroundColor: '#DFF3FF',
        flexDirection: 'row',
        height: 180,
        padding: 12,
        elevation: 2,
    },
    columnLeft: {
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 12
    },
    columnRight: {
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 23,
    },
    textStyle: {
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
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
    },
    buttonText: {

    },
    explainTextView: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    explainText: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
})
