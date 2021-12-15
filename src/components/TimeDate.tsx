import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const TimeDate = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.leftBox}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: '#fff',
                        alignSelf: 'center',
                    }}
                >
                    Mon 12.09.2020
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightBox}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: '#36A7E7',
                        alignSelf: 'center',
                    }}
                >
                    02:00 PM
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default TimeDate

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 360,
        height: 50,
        backgroundColor: '#F4F2F2',
        borderRadius: 24,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    leftBox: {
        backgroundColor: '#36A7E7',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        width: 220,
        margin: 0,
    },
    rightBox: {
        justifyContent: 'center',
        marginLeft: 18,
    },
})
