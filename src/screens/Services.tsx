import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Button, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ServiceBox from '../components/ServiceBox';
import { servicesColor } from '../config/styleConstants';
import { ScrollView } from 'react-native-gesture-handler';

export interface Props { }

const Services = ({ navigation }) => {
    const { colors } = useTheme();

    const theme = useTheme();

    const [value, onChangeText] = useState('Search local services around you');
    const servicesIconColor = '#fff'


    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 36, marginBottom: 12 }}>
                <TextInput
                    style={styles.serchInput}
                    onChangeText={text => onChangeText(text)}
                    // value={value}
                    placeholder='Search Here'
                />
                <Ionicons name='search-outline' size={30} />
            </View>

            <View style={styles.row}>
                <ServiceBox
                    color={servicesIconColor}
                    iconName={require('../assets/icons/cleaning.png')}
                    name='Cleaning'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName={require('../assets/icons/plumbing.png')}
                    name='Plumbing'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName={require('../assets/icons/painting.png')}
                    name='Painting'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName={require('../assets/icons/general.png')}
                    name='General'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName={require('../assets/icons/building.png')}
                    name='Building'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName={require('../assets/icons/gardening.png')}
                    name='Gardening'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName={require('../assets/icons/electricity.png')}
                    name='Electricity'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    color={servicesIconColor}
                    iconName={require('../assets/icons/heat.png')}
                    name='Heat'
                    onPress={() => navigation.navigate('ServicesMap')}
                />

            </View>
        </ScrollView>
    )
}

export default Services


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    serchInput: {
        height: 50,
        width: 280,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 12,
        margin: 12,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 999,
        margin: 4,
    },
});