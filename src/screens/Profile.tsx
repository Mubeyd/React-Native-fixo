import React, { useContext } from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';

import { AuthContext } from '../components/Context'
import { usersColRef } from '../config/firebaseCollections'

export interface Props { }

const Profile = ({ }: Props) => {

    // const { signOut } = useContext(AuthContext)

    const getUser = async () => {
        const userName = await usersColRef.doc('2ZIcHG7l9FQ7hhzSUyCX').get()
        // console.log(userName.data())
    }
    getUser()

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
                // style={styles.button}
                color='#543251'
                title="LOGOUT"
                onPress={() => {
                    // signOut()
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
    },
    button: {
        flex: 1,
        margin: 12,
    }
});