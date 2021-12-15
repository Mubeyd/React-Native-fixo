import React from 'react'
import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import SettingCard from '../components/SettingCard'
import { space, windowHeight } from '../config/styleConstants'

export interface Props { }

const Settings = ({ navigation }: Props) => {

    const logout = async () => {
        try {
            await auth().signOut();
            console.log('logout success :>> ');
        } catch (e) {
            console.log('error logout', e)
        }
    }

    return (
        <ImageBackground
            source={require('../assets/serviceBack.png')}
            style={styles.backgroundImage}
            resizeMode='stretch'
        >

            <View style={styles.container}>
                {/* <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Settings</Text>

                </View> */}
                <View style={styles.cardContainer}>
                    <SettingCard
                        text='Privacy'
                        onPress={() => navigation.navigate('Privacy')}
                    />
                    <SettingCard
                        text='Sign out'
                        onPress={() => {
                            logout()
                            Alert.alert('LOGOUT!')
                            console.log("object")
                        }}
                    />
                    <SettingCard
                        text='Help'
                        onPress={() => navigation.navigate('Help')}
                    />
                    <SettingCard
                        text='Be a FIXO'
                        onPress={() => navigation.navigate('BeaFIXO')}
                    />
                    <SettingCard
                        text='Contact Us'
                        onPress={() => console.log("object")}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

export default Settings


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: '20%',
    },
    headerText: {
        fontSize: 28,
        color: '#d02860',
        fontWeight: 'bold',
    },
    headerTextContainer: {
        fontSize: 24,
        color: '#36A7E7',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fcfcfc',
        width: '100%',
        height: windowHeight / 10,
        borderRadius: 3,
    },
    cardContainer: {
        alignItems: 'center',
        // padding: 20,
    },
});
