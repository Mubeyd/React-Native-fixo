import React, { useEffect, useState, useRef } from 'react'
import {
    Alert, Platform, StyleSheet, Text, View,
    TouchableOpacity, TextInput, Dimensions, Animated, Image
} from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import BottomSheet from 'reanimated-bottom-sheet';
import ReAnimated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker'
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import { Button } from '@ui-kitten/components'

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import StarRating from '../components/StartRating';
import { markers } from '../models/mapData';
import MapCard from '../components/MapCard';
import { space } from '../config/styleConstants';
import VoiceRecorder from '../components/VoiceRecorder';
import TimeDate from '../components/TimeDate';
import Submit from '../components/Submit';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;






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

    const [ifLocaionIsON, setIfLocaionIsON] = useState(false)

    const onLocationEnablePressed = () => {
        if (Platform.OS === 'android') {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded(
                { interval: 10000, fastInterval: 5000 }
            )
                .then(data => {
                    Alert.alert(data);
                    console.log('then :>> ', data);
                    setIfLocaionIsON(true)

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
            (error) => {
                console.log('Error :>> ', JSON.stringify(error));
                Alert.alert('Error', JSON.stringify(error))
                setIfLocaionIsON(false)

            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
    }

    let viewLocation = false

    let checkIfLocaionIsON = currentLocation.latitude === 37.034411 ? viewLocation = false : viewLocation = true
    // let checkIfLocaionIsON = checkIfLocaionIsON ? setIfLocaionIsON(false) : setIfLocaionIsON(true)

    const pdsFunc = async () => {

        // check if its enabled get locatoin and render live location
        // else ask to enable location service 


        if (!ifLocaionIsON) {
            onLocationEnablePressed()
            getLocation()

            // if (!checkIfLocaionIsON) {

            //     checkIfLocaionIsON = true
            // getLocation()
            // }
        } else {
            getLocation()
            checkIfLocaionIsON
        }
    }

    const bs = React.useRef(null)
    const fall = new ReAnimated.Value(1)


    // image 

    const addImage = require('../assets/banners/add.png')

    const [image, setImage] = useState('../assets/banners/add.png');
    const [imageIcon, setImageIcon] = useState(true);

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            // cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            setImage(image.path);
            // bs.current.snapTo(1);
        });
    }


    // sound 
    const [audio, setAudio] = useState({
        isLoggingIn: false,
        recordSecs: 0,
        recordTime: '00:00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
    })

    const audioRecorderPlayer = new AudioRecorderPlayer();



    const renderInner = () => (
        <View style={styles.panel}>
            <Text style={{
                marginBottom: 12,
                marginLeft: 12,
                fontWeight: 'bold',
            }}>
                Description
            </Text>
            <View style={styles.textInputView} >
                <TextInput
                    style={styles.textInputField}
                    onChangeText={e => { console.log('input description') }}
                    value={''}
                    placeholder='Please write a brief description'
                    numberOfLines={2}
                />
            </View>
            <Text style={{ margin: 6, fontWeight: 'bold', }}>
                Record a message
            </Text>
            <View style={{ justifyContent: 'center', margin: 6 }}>

                <VoiceRecorder />
            </View>

            {/* <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View> */}
            {/* <TouchableOpacity style={styles.panelButton} onPress={() => {
                takePhotoFromCamera()
                console.log('chosefoto')
            }}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity> */}
            <View style={{
                width: 220, height: 220,
                alignSelf: 'center'
            }}>
                {imageIcon ?

                    <TouchableOpacity
                        onPress={() => {
                            takePhotoFromCamera()
                            console.log('object')
                            setImageIcon(false)
                        }}
                    >
                        <Image
                            source={require('../assets/banners/add.png')}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            resizeMode="cover"
                        >
                        </Image>
                    </TouchableOpacity>
                    :
                    <Image
                        source={{ uri: image }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        resizeMode="cover"
                    >

                    </Image>
                }

            </View>
            <View style={{ margin: 6 }}>
                <TimeDate />
            </View>
            {/* <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity> */}
            <View style={{ margin: 6 }}>
                <Submit />
            </View>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            {/* <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View> */}
        </View>
    );





    return (

        <View style={styles.container}>
            <BottomSheet
                ref={bs}
                snapPoints={[610, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={false}
            />
            <ReAnimated.View style={[styles.container,
            { opacity: ReAnimated.add(0.4, ReAnimated.multiply(fall, 1.0)), }]}>
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
                                    {/* <Animated.FontAwesome5
                                        style={[styles.marker, scaleStyle]}
                                        name='map-marker-alt'
                                        size={18}
                                    ></Animated.FontAwesome5> */}
                                    <Animated.Image
                                        source={require('../assets/map_marker.png')}
                                        style={[styles.marker, scaleStyle]}
                                        resizeMode="cover"
                                    />
                                </Animated.View>
                            </Marker>
                        );
                    })}

                    {
                        viewLocation ?
                            <Marker
                                coordinate={{
                                    latitude: currentLocation.latitude,
                                    longitude: currentLocation.longitude,
                                }}
                                image={require('../assets/icons8-live-photos-96.png')}
                                title='Cuurent Location'
                            >
                            </Marker>
                            : null
                    }
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
                            <MapCard
                                name={marker.title}
                                logo={marker.logo}
                                ratings={marker.rating}
                                reviews={marker.reviews}
                                price={marker.price}
                                description1={marker.description1}
                                description2={marker.description2}
                                // orderState={marker.orderState}
                                imageSource={marker.image}
                                onPress={() => {
                                    bs.current.snapTo(0)
                                    console.log('MapCard', index)
                                }}
                            />
                            {/* <Image
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
                        </View> */}
                        </View>
                    ))}
                </Animated.ScrollView>
                <View style={styles.gpsIcon1}>
                    <MaterialIcons
                        onPress={() => pdsFunc()}
                        name="gps-fixed" size={36} />
                </View>
            </ReAnimated.View>
        </View>
    )
}

export default ServicesMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // searchBox: {
    //     position: 'absolute',
    //     marginTop: Platform.OS === 'ios' ? 40 : 20,
    //     flexDirection: "row",
    //     backgroundColor: '#fff',
    //     width: '90%',
    //     alignSelf: 'center',
    //     borderRadius: 5,
    //     padding: 10,
    //     shadowColor: '#ccc',
    //     shadowOffset: { width: 0, height: 3 },
    //     shadowOpacity: 0.5,
    //     shadowRadius: 5,
    //     elevation: 10,
    // },
    gpsIcon1: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        marginRight: 40,
        flexDirection: "row",
        width: '12%',
        alignSelf: 'flex-end',
        borderRadius: 5,
        justifyContent: 'center',
    },
    // gpsIcon2: {
    //     position: 'absolute',
    //     marginTop: Platform.OS === 'ios' ? 40 : 20,
    //     marginLeft: 20,
    //     flexDirection: "row",
    //     width: '12%',
    //     alignSelf: 'flex-start',
    //     borderRadius: 5,
    //     justifyContent: 'center',
    // },
    // chipsScrollView: {
    //     position: 'absolute',
    //     top: Platform.OS === 'ios' ? 90 : 80,
    //     paddingHorizontal: 10
    // },
    // chipsIcon: {
    //     marginRight: 5,
    // },
    // chipsItem: {
    //     flexDirection: "row",
    //     backgroundColor: '#fff',
    //     borderRadius: 20,
    //     padding: 8,
    //     paddingHorizontal: 20,
    //     marginHorizontal: 10,
    //     height: 35,
    //     shadowColor: '#ccc',
    //     shadowOffset: { width: 0, height: 3 },
    //     shadowOpacity: 0.5,
    //     shadowRadius: 5,
    //     elevation: 10,
    // },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    // endPadding: {
    //     paddingRight: width - CARD_WIDTH,
    // },
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
    },
    panel: {
        padding: 12,
        backgroundColor: '#FFFFFF',
        paddingTop: 0,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
        height: 610,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 200,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00a0fc',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#00a0fc',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    textInputView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: space,
        marginBottom: 6,
        backgroundColor: '#F4F2F2',
        width: '95%',
        height: space * 8,
        alignSelf: 'center',
        borderRadius: 24,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    textInputField: {
        // height: 44,
        width: '80%',
        borderRadius: 24,
        margin: space,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
})
