import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { space } from '../config/styleConstants'

const EditLocation = ({ text, backgroundColor }) => {
    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: backgroundColor }]}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default EditLocation

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 50,
        margin: space/2
    },
    text: {
        fontSize: 18,
        color: '#fff',
        margin: 4,
    },
})
