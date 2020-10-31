import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { space } from '../config/styleConstants'
import StarRating from './StartRating'

const OrderCard = () => {
    return (
        <View style={styles.conatiner}>
            <View style={styles.viewPart1}>
                <View style={styles.viewInner1}>
                    <AntDesign name='filetext1' size={34} />
                    <Text>Muhammed Ubeyd</Text>
                    <StarRating ratings={4} reviews={55} />
                </View>
                <View style={styles.viewInner2}>
                    <Text>
                        Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry.
                    </Text>
                </View>
            </View>

            <View style={styles.viewPart2}>
                <Text style={styles.text}>$345</Text>
                <Text style={styles.text}>2344</Text>
                <Button
                    mode='text'
                    color='#000'
                    style={styles.button}
                    onPress= {() => console.log('details')}
                >
                    Details
                </Button>
            </View>
        </View>
    )
}

export default OrderCard

const styles = StyleSheet.create({
    conatiner: {
        borderRadius: 15,
        margin: space * 1,
        backgroundColor: '#DFF3FF',

    },
    viewPart1: {
        flexDirection: 'column',
        margin: 3,
        padding: 3
    },
    viewInner1: {
        flexDirection: 'column',
        margin: 3,
        padding: 3
    },
    viewInner2: {
        flexDirection: 'column',
        margin: 3,
        padding: 3
    },
    viewPart2: {
        flexDirection: 'row',
        margin: 3,
        padding: 3
    },
    text: {
        flexDirection: 'row',
        margin: 3,
        padding: 3
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        // margin: 3,
        // padding: 3
    }

})
