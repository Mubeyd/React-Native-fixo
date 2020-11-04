import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

import { windowHeight } from '../config/styleConstants'

const ProfileNames = ({ firstName, lastName, onPress }) => {
    return (
        <View style={styles.container} >
            <TextInput
                style={styles.inputLeft}
                value={firstName}
                placeholder='Name'
                editable={false}
            >
            </TextInput>
            <TextInput
                style={styles.inputRight}
                value={lastName}
                placeholder='Surname'
                editable={false}
            >

            </TextInput>
            <AntDesign
                color='#000'
                name='edit'
                size={48}
                onPress={onPress}
            />

        </View>
    )
}

export default ProfileNames

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 30,
    },
    inputLeft: {
        width: 140,
        height: windowHeight / 12,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "bold",
        letterSpacing: 1,
        margin: 2
    },
    inputRight: {
        width: 140,
        height: windowHeight / 12,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "bold",
        letterSpacing: 1,
        margin: 2
    },
})
