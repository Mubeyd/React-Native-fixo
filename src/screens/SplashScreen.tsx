import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import {version} from '../config/constants'
import { usersColRef } from '../config/firebaseCollections';
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '@react-native-firebase/auth'
import useUser from '../hooks/useUser';



const SplashScreen = ({navigation}) => {
    
    const { colors } = useTheme();
    // const [user] = useAuthState(auth())


    const user = useUser()

    console.log('user', user?.phoneNumber)

    let userName
    const getUser = async() => {
        const userDoc = await usersColRef.doc('oJ9vbqghN3LSvSTHOFLK').get()
        // console.log(userDoc.data())
        const userName = userDoc.data()
        // console.log('userName', userName)
    }
    getUser()

    const subscriber = usersColRef.doc('oJ9vbqghN3LSvSTHOFLK').onSnapshot(doc => {doc.data()})
    // usersColRef.doc('oJ9vbqghN3LSvSTHOFLK').onSnapshot(doc => {
    //     console.log('doc.data() :>> ', doc.data());
    // })

    

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
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
                    color: colors.text
                }]}>Your home deserves the best</Text>
                {/* <Text style={styles.text}>Sign in with account</Text> */}
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
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
                <Text style={styles.textVersion}>Starlab.tech</Text>
                <Text style={styles.textVersion}>Version : {version}</Text>
                {/* <Text style={styles.textVersion}>Name : {subscriber.name}</Text> */}
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
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
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5,
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