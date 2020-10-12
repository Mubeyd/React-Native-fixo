import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { space } from '../config/styleConstants'

const OrderCard = () => {
    return (
        <View style={styles.conatiner}>
            <View style={styles.viewPart1}>
                <View style={styles.viewInner1}>
                    <AntDesign name='filetext1' size={24} />
                    <Text>Muhammed Ubeyd</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <AntDesign name='staro' size={8} />
                        <AntDesign name='staro' size={8} />
                        <AntDesign name='staro' size={8} />
                        <AntDesign name='staro' size={8} />
                    </View>
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
        backgroundColor: '#cef2ef',

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
