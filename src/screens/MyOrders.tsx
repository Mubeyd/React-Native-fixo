import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export interface Props { }

const MyOrders = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Button
                title="Go to details screen...again"
                onPress={() => navigation.push("MyOrder")}
            />
            <Button
                title="Go to home"
                onPress={() => navigation.navigate("Services")}
            />
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

export default MyOrders


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});