import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { space, windowHeight } from '../config/styleConstants';


const InputLineUser = ({ labelValue, iconType, onPress, placeholder, text, ...rest }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.labelText} >
                    {text}
                </Text>
                <TextInput
                    value={labelValue}
                    style={styles.input}
                    numberOfLines={1}
                    placeholderTextColor="#999"
                    placeholder={placeholder}
                    {...rest}
                />
            </View>
        </View>
    );
};

export default InputLineUser;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 6,
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
    inputContainer: {
        marginHorizontal: 6
    },
    labelText: {
        color: '#aaa',
        marginHorizontal: 12,
        fontSize: space
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
});