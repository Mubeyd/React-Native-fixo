import React from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';


export interface Props { }

const Profile = ({ }: Props) => {

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
            <Text>Profile Screen</Text>
            <Text>Name: </Text>
            <Button
                title="Click Here"
                onPress={() => Alert.alert('Button Clicked!')}
            />
            <Button
                color='#543251'
                title="LOGOUT"
                onPress={() => {
                    logout()
                    console.log('logout')
                    Alert.alert('LOGOUT!')
                }
                }
            />
        </View>
    )
}

export default Profile


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});