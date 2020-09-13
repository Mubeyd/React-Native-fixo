import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Button, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native';

export interface Props { }

const Services = ({ navigation }) => {
    const { colors } = useTheme();

    const theme = useTheme();

    const [value, onChangeText] = useState('Search local services around you');


    return (
        <View style={styles.container}>
            <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

            <View>
                <TextInput
                    style={styles.serchInput}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
            </View>

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
    serchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
});