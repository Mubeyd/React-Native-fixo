import React, { useEffect, useState, useRef } from 'react'
import {
    Alert, Platform, StyleSheet, Text, View,
    TouchableOpacity, TextInput, Dimensions, Animated, Image
} from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import StarRating from '../components/StartRating';
import { markers } from '../models/mapData';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;



const onLocationEnablePressed = () => {
    if (Platform.OS === 'android') {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded(
            { interval: 10000, fastInterval: 5000 }
        )
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

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 37.034411,
        longitude: 37.319067
    })

    const initialMapState = {
        markers,
        region: {
            latitude: currentLocation.latitude ? currentLocation.latitude : 37.034411,
            longitude: currentLocation.longitude ? currentLocation.longitude : 37.319067,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            // check for map height for user sight
        },
    };

    const [state, setState] = useState(initialMapState);

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            // animate 30% away from landing on the next item
            if (index >= state.markers.length) {
                index = state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }


            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = state.markers[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: state.region.latitudeDelta,
                            longitudeDelta: state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
            clearTimeout(regionTimeout);
        });
    });

    const interpolations = state.markers.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    const _map = useRef(null);
    const _scrollView = useRef(null);

    // use useLocation Hook later instead this func.
    const getLocation = () => {
        // get result if gps is enabled *****
        Geolocation.getCurrentPosition(position => {
            const initialPosition = JSON.stringify(position);
            setCurrentLocation({
                ...currentLocation,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            console.log('initialPosition :>> ', initialPosition);
        },
            error => Alert.alert('Error', JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }

    return (

        <View style={styles.container}>

            <MapView
                ref={_map}
                initialRegion={state.region}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
            >
                {state.markers.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    };
                    return (
                        <Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../assets/map_marker.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </Marker>
                    );
                })}
                <Marker
                    coordinate={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                    }}
                    image={require('../assets/icons8-live-photos-96.png')}
                    title='Cuurent Location'
                >
                </Marker>
            </MapView>
            {/* <View>
                // check if user pressed on a marker then display the card related
                    // this done by addLisetener or useState 
                // else display null 
            </View> */}
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }
                )}
            >
                {state.markers.map((marker, index) => (
                    <View style={styles.card} key={index}>
                        <Image
                            source={marker.image}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.textContent}>
                            <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                            <StarRating ratings={marker.rating} reviews={marker.reviews} />
                            <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={[styles.signIn, {
                                        borderColor: '#FF6347',
                                        borderWidth: 1
                                    }]}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#FF6347'
                                    }]}>Order Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>

            {/* <MapView
                style={styles.container}
                initialRegion={{
                    latitude: currentLatitude ? currentLatitude : 37.04836,
                    longitude: currentLongitude ? currentLongitude : 37.34371,
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
                        // getLocation()
                    }}
                >
                    <Callout>
                        <View>
                            <View style={styles.markerWrap}>
                                <Text>Best Fixer</Text>
                                <Text>A short Description sdfsafa</Text>
                            </View>
                        </View>
                    </Callout>
                </Marker>
                <Marker
                    coordinate={{
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                    }}
                    image={require('../assets/icons8-live-photos-96.png')}
                    title='Cuurent Location'
                >
                </Marker>
            </MapView> */}



            <View style={styles.gpdIcon1}>
                <MaterialIcons
                    onPress={() => getLocation()} name="gps-fixed" size={36} />
            </View>
            <View style={styles.gpdIcon2}>
                <Ionicons
                    onPress={onLocationEnablePressed} name="location-outline" size={36} />
            </View>
            {/* <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                />
                <Ionicons name="ios-search" size={20} />
            </View> */}
            {/* <TouchableOpacity onPress={onLocationEnablePressed}><Text>Click here !</Text></TouchableOpacity> */}
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
    gpdIcon1: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        marginRight: 40,
        flexDirection: "row",
        width: '12%',
        alignSelf: 'flex-end',
        borderRadius: 5,
        justifyContent: 'center',
    },
    gpdIcon2: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        marginLeft: 20,
        flexDirection: "row",
        width: '12%',
        alignSelf: 'flex-start',
        borderRadius: 5,
        justifyContent: 'center',
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
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
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
        marginTop: 5,
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
