import React, { useContext } from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import { AuthContext } from '../components/Context'
import { usersColRef } from '../config/firebaseCollections'

export interface Props { }

const Profile = ({ }: Props) => {

    const { signOut } = useContext(AuthContext)

    const getUser = async() => {
        const userName = await usersColRef.doc('2ZIcHG7l9FQ7hhzSUyCX').get()
        // console.log(userName.data())
    }
    getUser()

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
                    signOut()
                    // console.log('logout')
                    Alert.alert('LOGOUT!')
                }}
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