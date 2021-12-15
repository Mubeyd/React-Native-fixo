import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../config/styleConstants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const InputLine = ({ labelValue, iconType, onPress, placeholder, ...rest }) => {
    // const { labelValue, placeholderText, iconType, ...rest } = props
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <FontAwesome
                    name={iconType}
                    size={30}
                    color="#666"
                    onPress={() => onPress()}
                    color='#36A7E7'
                />
            </View>
            <TextInput
                value={labelValue}
                style={styles.input}
                numberOfLines={1}
                placeholderTextColor="#999"
                placeholder={placeholder}
                {...rest}
            />
        </View>
    );
};

export default InputLine;

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
        letterSpacing: 1
    },
});