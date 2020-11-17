import React from 'react'
import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
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
                style={{}}
            >
                <Image
                    source={require('../assets/banners/pencil.png')}
                    style={styles.cardImage}
                    // resizeMode="cover"
                />
                {/* <AntDesign
                    color='#000'
                    name='edit'
                    size={48}
                /> */}
            </TouchableOpacity>
        </View>
    )
}

export default ProfileNames

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        // marginHorizontal: 24,
        // marginVertical: 10,
        // alignItems: 'center',
    },
    boxView: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        marginRight: 10,
        height: windowHeight / 10,
        backgroundColor: '#fff',
        paddingBottom: 12
    },
    labelText: {
        color: '#aaa',
        marginHorizontal: 12,
        // fontSize: space,
        marginTop: 6,
        margin: 0,
    },
    inputLeft: {
        width: 140,
        fontSize: 18,
        fontFamily: 'Lato-Regular',
        color: '#333',
        fontWeight: "bold",
        letterSpacing: 1,
        marginLeft: 6,
        marginBottom: 18,
    },
    inputRight: {
        width: 140,
        fontSize: 18,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "bold",
        letterSpacing: 1,
        marginLeft: 6,
        marginBottom: 18,

    },
    cardImage: {
        // flex: 3,
        width: 44,
        height: 44,
        // alignSelf: 'center',
        marginRight: 0,
        marginTop: 12,
        resizeMode: 'stretch',
    },
})
