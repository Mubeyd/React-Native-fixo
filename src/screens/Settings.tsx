import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import SettingCard from '../components/SettingCard'
import { space, windowHeight } from '../config/styleConstants'

export interface Props { }

const Settings = ({ }: Props) => {

    const logout = async () => {
        try {
            await auth().signOut();
            console.log('logout success :>> ');
        } catch (e) {
            console.log('error logout', e)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Settings</Text>

            </View>
            <View style={styles.cardContainer}>
                <SettingCard
                    text='Privacy'
                    onPress={() => console.log("object")}
                />
                <SettingCard
                    text='Sign out'
                    onPress={() => {
                        // logout()
                        console.log("object")
                    }}
                />
                <SettingCard
                    text='Help'
                    onPress={() => console.log("object")}
                />
                <SettingCard
                    text='Be a FIXO'
                    onPress={() => console.log("object")}
                />
                <SettingCard
                    text='Contact Us'
                    onPress={() => console.log("object")}
                />
            </View>
        </View>
    )
}

export default Settings


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 28,
        color: '#d02860',
        fontWeight: 'bold',
    },
    headerTextContainer: {
        fontSize: 24,
        color: '#4287f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: space * 4,
        backgroundColor: '#fcfcfc',
        width: '100%',
        height: windowHeight / 10,
        borderRadius: 3,
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});
