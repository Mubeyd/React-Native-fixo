import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

const VoiceRecorder = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftBox}>
                <View style={styles.viewMic}>
                    <TouchableOpacity>
                        <Feather name='mic' size={36} color='#fff' />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewPlay}>
                    <TouchableOpacity>
                        <FontAwesome name='play' size={36} color='#fff' />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.rightBox}>
                <View style={{
                    width: 200,
                    height: 2,
                    backgroundColor: '#36A7E7',
                }}>

                </View>
            </View>
        </View>
    )
}

export default VoiceRecorder

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 360,
        height: 56,
        backgroundColor: '#F4F2F2',
        borderRadius: 24,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    leftBox: {
        backgroundColor: '#36A7E7',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        width: 110,
        margin: 0,
    },
    viewMic: {
        justifyContent: 'center',
        marginHorizontal: 12,
    },
    viewPlay: {
        justifyContent: 'center',
        marginRight: 12,
    },
    rightBox: {
        justifyContent: 'center',
        marginLeft: 18,
        width: 250,
    },
})
