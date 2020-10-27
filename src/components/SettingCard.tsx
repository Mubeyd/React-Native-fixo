import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { space, windowHeight } from '../config/styleConstants'

const SettingCard = ({ text, ...rest }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            {...rest}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default SettingCard

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '90%',
        height: windowHeight / 15,
        backgroundColor: '#f5d5d9',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    buttonText: {
        fontSize: space * 2,
        fontWeight: 'bold',
        color: '#000000',
        fontFamily: 'Lato-Regular',
    },
})
