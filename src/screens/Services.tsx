import React from 'react'
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native'
import { useTheme } from '@react-navigation/native';

export interface Props { }

const Services = ({ navigation }) => {
    const { colors } = useTheme();

    const theme = useTheme();
    return (
        <View style={styles.container}>
            <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
            <Text style={{ color: colors.text }}>Services</Text>
            <Button
                title="Go to MyOrders screen"
                onPress={() => navigation.navigate("MyOrders")}
            />
        </View>
    )
}

export default Services


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});