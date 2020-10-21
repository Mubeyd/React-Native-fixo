import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Button, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ServiceBox from '../components/ServiceBox';
import { servicesColor, space, windowDimension } from '../config/styleConstants';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

export interface Props { }

const Services = ({ navigation }) => {
    const { colors } = useTheme();

    const theme = useTheme();

    const [value, onChangeText] = useState('Search local services around you');
    const servicesIconColor = '#fff'

    const boxSize = (windowDimension.width - space * 2) / 2 - space / 2


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
                <Ionicons name='search-outline' size={boxSize / 4} />
            </View>

            <View style={styles.row}>
                <ServiceBox
                    iconWidth={boxSize / 3.5}
                    iconHeight={boxSize / 4}
                    // color={servicesIconColor}
                    iconPath={require('../assets/icons/cleaning.png')}
                    name='Cleaning'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    iconWidth={boxSize / 3.5}
                    iconHeight={boxSize / 4}
                    // color={servicesIconColor}
                    iconPath={require('../assets/icons/plumbing.png')}
                    name='Plumbing'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    iconWidth={boxSize / 3.5}
                    iconHeight={boxSize / 4}
                    // color={servicesIconColor}
                    iconPath={require('../assets/icons/painting.png')}
                    name='Painting'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    iconWidth={boxSize / 3.5}
                    iconHeight={boxSize / 4}
                    // color={servicesIconColor}
                    iconPath={require('../assets/icons/general.png')}
                    name='General'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    iconWidth={boxSize / 3}
                    iconHeight={boxSize / 4}
                    // color={servicesIconColor}
                    iconPath={require('../assets/icons/building.png')}
                    name='Building'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    iconWidth={boxSize / 3.5}
                    iconHeight={boxSize / 3.8}
                    // color={servicesIconColor}
                    iconPath={require('../assets/icons/gardening.png')}
                    name='Gardening'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    iconWidth={boxSize / 4}
                    iconHeight={boxSize / 3.6}
                    // color={servicesIconColor}
                    iconPath={require('../assets/icons/electricity.png')}
                    name='Electricity'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                <ServiceBox
                    iconWidth={boxSize / 3}
                    iconHeight={boxSize / 4}
                    // color={servicesIconColor}
                    iconPath={require('../assets/icons/heat.png')}
                    name='Heat'
                    onPress={() => navigation.navigate('ServicesMap')}
                />
                {/* <Image/> */}

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