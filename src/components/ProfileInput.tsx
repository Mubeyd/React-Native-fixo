import React, { ReactChild } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../config/styleConstants';
import AntDesign from 'react-native-vector-icons/AntDesign';


const ProfileInput = ({ labelValue, iconType,onPress,  ...rest }) => {
    // const { labelValue, placeholderText, iconType, ...rest } = props
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign
                    name={iconType}
                    size={25}
                    color="#666"
                    onPress={() => onPress()}
                />
            </View>
            <TextInput
                value={labelValue}
                style={styles.input}
                numberOfLines={1}
                placeholderTextColor="#666"
                {...rest}
            />
        </View>
    );
};

export default ProfileInput;

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '90%',
        height: windowHeight / 12,
        borderColor: '#ccc',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 20,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "bold",
        letterSpacing: 2
    },
    //   inputField: {
    //     padding: 10,
    //     marginTop: 5,
    //     marginBottom: 10,
    //     width: windowWidth / 1.5,
    //     height: windowHeight / 15,
    //     fontSize: 16,
    //     borderRadius: 8,
    //     borderWidth: 1
    //   }
});