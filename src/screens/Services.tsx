import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Button, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native';
import ServiceBox from '../components/ServiceBox';
import { servicesColor } from '../config/styleConstants';

export interface Props { }

const Services = ({ navigation }) => {
    const { colors } = useTheme();

    const theme = useTheme();

    const [value, onChangeText] = useState('Search local services around you');
    const servicesIconColor = '#fff'


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
            <View style={styles.row}>
                <ServiceBox
                    color={servicesIconColor}
                    iconName="silverware-clean"
                    name='Cleaning'
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName="pipe-disconnected"
                    name='Plumbing'
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName="format-paint"
                    name='Painting'
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName="douban"
                    name='General'
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName="hospital-building"
                    name='Building'
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName="pine-tree"
                    name='Gardening'
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName="cable-data"
                    name='Electricity'
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName="car-seat-heater"
                    name='Heat'
                />
            </View>
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
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 999,
    },
});