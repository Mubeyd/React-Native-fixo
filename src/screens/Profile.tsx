import React from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'

export interface Props { }

const Profile = ({ }: Props) => {
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <Button
                title="Click Here"
                onPress={() => Alert.alert('Button Clicked!')}
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
});