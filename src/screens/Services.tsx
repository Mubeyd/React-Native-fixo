import React, { useState } from 'react'
import { StyleSheet, View, StatusBar, TextInput, ImageBackground } from 'react-native'
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import ServiceBox from '../components/ServiceBox';
import { space, windowDimension } from '../config/styleConstants';
import { ScrollView } from 'react-native-gesture-handler';

export interface Props { }

const Services = ({ navigation }) => {
    const { colors } = useTheme();

    const theme = useTheme();

    const [value, onChangeText] = useState('Search local services around you');

    const boxSize = (windowDimension.width - space * 2) / 2 - space / 2


    return (
        <ImageBackground
            source={require('../assets/serviceBack.png')}
            style={styles.backgroundImage}
            resizeMode='cover'
        >

            <ScrollView style={styles.container}>
                <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

                <View style={styles.searchView} >
                    <TextInput
                        style={styles.serchInput}
                        onChangeText={text => onChangeText(text)}
                        // value={value}
                        placeholder='Search For a Service'
                    />
                    <Ionicons color='#36A7E7' name='search-outline' size={boxSize / 7} />
                </View>

                <View style={styles.row}>
                    <ServiceBox
                        iconWidth={boxSize / 3.5}
                        iconHeight={boxSize / 4}
                        iconPath={require('../assets/icons/cleaning.png')}
                        name='Cleaning'
                        onPress={() => navigation.navigate('ServicesMap')}
                    />
                    <ServiceBox
                        iconWidth={boxSize / 3.5}
                        iconHeight={boxSize / 4}
                        iconPath={require('../assets/icons/plumbing.png')}
                        name='Plumbing'
                        onPress={() => navigation.navigate('ServicesMap')}
                    />
                    <ServiceBox
                        iconWidth={boxSize / 3.5}
                        iconHeight={boxSize / 4}
                        iconPath={require('../assets/icons/painting.png')}
                        name='Painting'
                        onPress={() => navigation.navigate('ServicesMap')}
                    />
                    <ServiceBox
                        iconWidth={boxSize / 3.5}
                        iconHeight={boxSize / 4}
                        iconPath={require('../assets/icons/general.png')}
                        name='General'
                        onPress={() => navigation.navigate('ServicesMap')}
                    />
                    <ServiceBox
                        iconWidth={boxSize / 3}
                        iconHeight={boxSize / 4}
                        iconPath={require('../assets/icons/building.png')}
                        name='Building'
                        onPress={() => navigation.navigate('ServicesMap')}
                    />
                    <ServiceBox
                        iconWidth={boxSize / 3.5}
                        iconHeight={boxSize / 3.8}
                        iconPath={require('../assets/icons/gardening.png')}
                        name='Gardening'
                        onPress={() => navigation.navigate('ServicesMap')}
                    />
                    <ServiceBox
                        iconWidth={boxSize / 4}
                        iconHeight={boxSize / 3.6}
                        iconPath={require('../assets/icons/electricity.png')}
                        name='Electricity'
                        onPress={() => navigation.navigate('ServicesMap')}
                    />
                    <ServiceBox
                        iconWidth={boxSize / 3}
                        iconHeight={boxSize / 4}
                        iconPath={require('../assets/icons/heat.png')}
                        name='Heat'
                        onPress={() => navigation.navigate('ServicesMap')}
                    />
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default Services


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },

    container: {
        flex: 1,
    },
    searchView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: space,
        marginBottom: 6,
        backgroundColor: '#fff',
        width: '90%',
        height: 48,
        alignSelf: 'center',
        borderRadius: 24,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    serchInput: {
        height: 44,
        width: '75%',
        borderRadius: 24,
        margin: 12,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 999,
        margin: 4,
    },
});