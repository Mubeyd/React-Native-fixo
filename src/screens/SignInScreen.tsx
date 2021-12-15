import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Platform,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from 'react-native-paper';

import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '@react-native-firebase/auth'
import { usersColRef } from '../config/firebaseCollections';
import firestore from '@react-native-firebase/firestore'
import { User } from '../models/firestoreInterfaces';
import { useBackButton } from '../hooks/useBackButton';
import { Button, Input, Text } from '@ui-kitten/components'
import { backgroundColor, space } from '../config/styleConstants';
import InputLine from '../components/InputLine';


const SignInScreen = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('+90')
    const [code, setCode] = useState('')
    const [confirmResult, setConfirmResult] = useState(() => { })
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
                        adress: '',
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
        <LinearGradient colors={['#36A7E7', '#6DBCE8']} style={styles.container}>
            <StatusBar backgroundColor='#36A7E7' barStyle="light-content" />
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
                    // color: colors.text,
                }]}> Enter Your Phone Number </Text>

                <View style={styles.action}>
                    <InputLine
                        maxLength={13}
                        autoFocus
                        disabled={confirming}
                        returnKeyType="next"
                        textContentType="telephoneNumber"
                        keyboardType="phone-pad"
                        placeholder="Phone Number"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        labelValue={phoneNumber}
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
                        iconType='phone'
                        onPress={() => console.log('from edit comp object')}
                    />
                </View>

                {!confirming ? (
                    <Button
                        style={styles.buttonLogin}
                        status='info'
                        disabled={phoneNumber.length !== 13 || !phoneNumber.startsWith('+')}
                        onPress={async () => {
                            try {
                                setLoading(true)
                                const confirm = await auth().signInWithPhoneNumber(phoneNumber)
                                setConfirming(true)

                                setConfirmResult(() => async (c: string) => {
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
                        Get verification code
                    </Button>
                ) : null}

                {confirming ? (
                    <>
                        <View style={styles.action}>

                            <InputLine
                                style={styles.loginInput}
                                autoFocus
                                placeholder="Code"
                                maxLength={12}
                                keyboardType="phone-pad"
                                returnKeyType="go"
                                labelValue={null}
                                onChangeText={(e) => {
                                    setCode(e)
                                }}
                                iconType='envelope-o'

                                onPress={() => console.log('from edit comp object')}
                            />
                        </View>
                        <Button
                            disabled={!code}
                            style={styles.buttonLogin}
                            status='info'
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
        </LinearGradient>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 30
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 20,
    },
    text_footer: {
        color: '#36A7E7',
        fontSize: 18,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        justifyContent: 'center'
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        height: 100
    },
    buttonLogin: {
        borderColor: backgroundColor,
        marginTop: space,
        width: '90%',
        alignSelf: "center"
    },
    loginInput: {
        marginLeft: space,
        alignSelf: 'center',
    },
});