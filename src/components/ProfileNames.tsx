import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { space, windowHeight } from '../config/styleConstants'

const ProfileNames = ({ firstName, lastName, onPress }) => {
    return (
        <View style={styles.container} >
            <View style={styles.boxView} >
                <Text style={styles.labelText}>
                    First Name
                </Text>
                <TextInput
                    style={styles.inputLeft}
                    value={firstName}
                    placeholder='First Name'
                    editable={false}
                >
                </TextInput>
            </View>
            <View style={styles.boxView}>
                <Text style={styles.labelText}>
                    Last Name
                </Text>
                <TextInput
                    style={styles.inputRight}
                    value={lastName}
                    placeholder='Last Name'
                    editable={false}
                >

                </TextInput>
            </View>
            <TouchableOpacity
                onPress={onPress}
            >
                <AntDesign
                    color='#000'
                    name='edit'
                    size={48}
                />
            </TouchableOpacity>
        </View>
    )
}

export default ProfileNames

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 24,
        marginVertical: 10,
        alignItems: 'center',
    },
    boxView: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        marginRight: 10,
        height: windowHeight / 10,
    },
    labelText: {
        color: '#aaa',
        marginHorizontal: 12,
        fontSize: space
    },
    inputLeft: {
        width: 140,
        fontSize: 16,
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
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "bold",
        letterSpacing: 1,
        margin: 2
    },
})
