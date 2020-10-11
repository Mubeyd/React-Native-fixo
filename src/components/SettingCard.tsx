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
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#fcfcfc',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,

    },
    buttonText: {
        fontSize: space * 2,
        fontWeight: 'bold',
        color: '#4287f5',
        fontFamily: 'Lato-Regular',
    },
})
