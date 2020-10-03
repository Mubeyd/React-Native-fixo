import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/Context'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '@react-native-firebase/auth'
import { usersColRef } from '../config/firebaseCollections';
import firestore from '@react-native-firebase/firestore'
import { User } from '../models/firestoreInterfaces';
import { useBackButton } from '../hooks/useBackButton';




const SignInScreen = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('+90')
    const [code, setCode] = useState('')
    const [confirmResult, setConfirmResult] = useState()
    const [loginWithNumber, setLoginWithNumber] = useState(false)
    const [confirming, setConfirming] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user] = useAuthState(auth())


    useEffect(() => {
        if (user) {
            ;(async () => {
                const usersSnapshot = await usersColRef.where('phoneNumber', '==', user!.phoneNumber).get()
                if (usersSnapshot.size === 0) {
                    await usersColRef.add({
                        phoneNumber: user!.phoneNumber,
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        name: '',
                    } as User)
                }
            })()
        }
    }, [ user])

    useBackButton(() => {
        if (loginWithNumber) {
            setLoginWithNumber(false)
            return true
        }
        return false
    })

    useBackButton(() => {
        if (confirming) {
            setConfirming(false)
            return true
        }
        return false
    })




    // const [data, setData] = React.useState({
    //     username: '',
    //     check_textInputChange: false,
    //     secureTextEntry: true,
    //     isValidUser: true,
    // });

    const { signIn } = useContext(AuthContext)

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}> Enter Your Phone Number </Text>

                <View style={styles.action}>
                    <FontAwesome
                        name="mobile-phone"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Phone Number"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        onChangeText={(e) => console.log(e)}
                        onEndEditing={(e) => console.log(e)}
                    />
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signUp}
                        onPress={() => signIn()}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signUp}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});