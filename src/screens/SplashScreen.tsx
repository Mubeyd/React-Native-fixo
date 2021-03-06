import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { version } from '../config/constants'
import useUser from '../hooks/useUser';


const SplashScreen = ({ navigation }) => {

    const { colors } = useTheme();
    const user = useUser()

    console.log('user PhoneNumber', user?.phoneNumber)
    console.log('user Id', user?.uid)

    return (

        <LinearGradient colors={['#36A7E7', '#6DBCE8']} style={styles.container}>
            <StatusBar backgroundColor='#36A7E7' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={1500}
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                <Text style={[styles.title, {
                    // color: colors.text
                }]}>Your Home Deserves The Best</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                        <LinearGradient
                            colors={['#6DBCE8', '#36A7E7']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                {/* <Text style={styles.textVersion}>Starlab.tech</Text> */}
                <Text style={styles.textVersion}>Version : 0.2.1</Text>
            </Animatable.View>
        </LinearGradient>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: 250,
        height: 100,
        // width: height_logo,
        // height: height_logo,
    },
    title: {
        color: '#36A7E7',
        fontSize: 30,
        fontWeight: 'bold',
        // textDecorationStyle: ''
    },
    textVersion: {
        color: 'grey',
        marginTop: 15,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});