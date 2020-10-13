import React, { useContext, useEffect, useState } from 'react';
import {
    View,
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
import { Button, Input, Text } from '@ui-kitten/components'
import { backgroundColor, space } from '../config/styleConstants';





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
            ; (async () => {
                const usersSnapshot = await usersColRef.where('phoneNumber', '==', user!.phoneNumber).get()
                if (usersSnapshot.size === 0) {
                    await usersColRef.add({
                        phoneNumber: user!.phoneNumber,
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        name: '',
                        surname: '',
                    } as User)
                }
            })()
        }
    }, [user])

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
                    color: colors.text, 
                }]}> Enter Your Phone Number </Text>

                <View style={styles.action}>
                        <FontAwesome
                            name="mobile-phone"
                            color={colors.text}
                            size={30}
                        />
                    <Input
                        maxLength={13}
                        autoFocus
                        disabled={confirming}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        returnKeyType="next"
                        textContentType="telephoneNumber"
                        keyboardType="phone-pad"
                        placeholder="Phone Number"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        value={phoneNumber}
                        onChangeText={(e) => {
                            if (e === '') {
                                setPhoneNumber('+')
                            }
                            if (!e.startsWith('+')) {
                                return
                            }
                            setPhoneNumber(e)
                            console.log(e)
                        }}
                    />
                </View>

                {!confirming ? (
                    <Button
                        style={styles.buttonLogin}
                        status='success'
                        disabled={phoneNumber.length !== 13 || !phoneNumber.startsWith('+')}
                        onPress={async () => {
                            try {
                                setLoading(true)
                                const confirm = await auth().signInWithPhoneNumber(phoneNumber)
                                setConfirming(true)

                                setConfirmResult( () => async (c: string) => {
                                    setLoading(true)
                                    try {
                                        await confirm.confirm(c)
                                        console.log('success catching verification code :>> ', c);
                                    } catch (e) {
                                        console.log('error catching verification code :>> ', e);
                                    } finally {
                                        setLoading(false)
                                    }
                                })
                            } catch (e) {
                                console.log('error login phone number :>> ', e)
                            } finally {
                                setLoading(false)
                            }
                        }}
                    >
                        Next
                    </Button>
                ) : null}

                {confirming ? (
                    <>
                        <Input
                            autoFocus
                            style={styles.loginInput}
                            placeholder="Code"
                            maxLength={14}
                            keyboardType="number-pad"
                            returnKeyType="go"
                            onChangeText={e => {
                                setCode(e)
                            }}
                        />
                        <Button
                            disabled={!code}
                            style={styles.buttonLogin}
                            status='success'
                            size="large"
                            onPress={() => {
                                confirmResult(code)
                                console.log('code', code)
                            }}
                        >
                            Login
                        </Button>
                    </>
                ) : null}

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
        fontSize: 18,
        marginBottom:12,

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
    buttonLogin: {
        borderColor: backgroundColor,
        marginTop: space,
    },
    loginInput: {
        marginVertical: space,
    },
});