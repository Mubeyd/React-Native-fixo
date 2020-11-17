import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { space } from '../config/styleConstants'

const EditLocation = ({ text, backgroundColor, onPress }) => {
    return (
        <TouchableOpacity
        onPress={onPress}
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
        margin: space/2,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        margin: 4,
    },
})
