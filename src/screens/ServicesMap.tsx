import React from 'react'
import { Alert, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import Permissions from 'react-native-permissions'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const onLocationEnablePressed = () => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
      .then(data => {
        Alert.alert(data);
      }).catch(err => {
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
        // codes : 
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        Alert.alert("Error " + err.message + ", Code : " + err.code);
      });
    }
  }


const ServicesMap = () => {

    const getLocation = () => {
        // get result if gps is erabled *****
        Geolocation.getCurrentPosition(position => {
            const initialPosition = JSON.stringify(position);
            console.log('initialPosition :>> ', initialPosition);
        },
            error => Alert.alert('Error', JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }

    return (

        <View style={styles.container}>
            <MapView
                style={styles.container}
                initialRegion={{
                    latitude: 37.04836,
                    longitude: 37.34371,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider={PROVIDER_GOOGLE}
            >
                <Marker
                    coordinate={{
                        latitude: 37.04836,
                        longitude: 37.34371,
                    }}
                    image={require('../assets/map_marker.png')}
                    title='Gazintep Kalesi'
                    description='Tarihi Mekan'
                    onPress={() => {
                        getLocation()
                    }}
                >
                </Marker>
            </MapView>
            <TouchableOpacity onPress={onLocationEnablePressed}><Text>Click here !</Text></TouchableOpacity>
        </View>
    )
}

export default ServicesMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        // paddingRight: width - CARD_WIDTH,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        // height: CARD_HEIGHT,
        // width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})
