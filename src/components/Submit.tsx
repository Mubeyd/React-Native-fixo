import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo';

interface Props {
    onPress: () => void
}
const Submit = (props: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.leftBox}
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 22,
                        color: '#fff',
                        alignSelf: 'center',
                    }}
                >Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={props.onPress}
                style={styles.rightBox}
            >
                <Entypo name='cross' size={36} color='#fff' />
            </TouchableOpacity>
        </View>
    )
}

export default Submit

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 360,
        height: 56,
    },
    leftBox: {
        backgroundColor: '#36A7E7',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 24,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        width: 280,
        height: 56,
        margin: 0,
    },
    rightBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#36A7E7',
        marginLeft: 18,
        width: 56,
        height: 56,
        borderRadius: 36,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
})
