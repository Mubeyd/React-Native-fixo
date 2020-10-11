import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button, Alert, ViewStyle } from 'react-native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { useFormik } from 'formik'
import useUser from '../hooks/useUser';
import { backgroundColor, borderColor, borderRadius, borderWidth, cardElevation, largeFontSize, primaryTextColor, space } from '../config/styleConstants';
import ProfileInput from '../components/ProfileInput'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { usersColRef } from '../config/firebaseCollections';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';


export interface Props { }

interface FormikFields {
    phoneNumber: string
    userName: string
    surname: string
}

const Profile = ({ navigation }: Props) => {
    const user = useUser()
    const uid = useUser()
    const uidData = uid?.uid
    const editingUserId: string | undefined = uidData


    const [userUseDocSnapshot] = useDocument(usersColRef.doc(editingUserId ?? 'noUser'))
    const editingUser = userUseDocSnapshot?.data()

    useEffect(() => { }, [editingUser])
    console.log('userData :>>:>>:>>:>>:>>:>>:>>:>> ', uidData);
    console.log('userData :>>:>>:>>:>>:>>:>>:>>:>> ', editingUser?.surname);
    console.log('userData :>>:>>:>>:>>:>>:>>:>>:>> ', editingUser?.phoneNumber);

    const logout = async () => {
        try {
            await auth().signOut();
            console.log('logout success :>> ');
        } catch (e) {
            console.log('error logout', e)
        }
    }


    const phoneNumber = user?.phoneNumber ?? editingUser?.phoneNumber



    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Profile Screen</Text>
            <Text style={styles.headerText}>{editingUser?.surname}</Text>
            <ProfileInput
                labelValue={phoneNumber}
                iconType='phone'
                keyboardType="phone-pad"
                onChangeText={console.log('from edit comp object')}
                onPress={() => console.log('from edit comp object')}
                editable={false}
            />

            <ProfileInput
                labelValue={editingUser?.name}
                iconType="edit"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={console.log('from edit comp object')}
                editable={false}
                onPress={() => console.log('from edit comp object')}

            />
            <ProfileInput
                labelValue={editingUser?.surname}
                iconType="edit"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={console.log('from edit comp object')}
                editable={false}
                onPress={() => 
                    {navigation.navigate('ProfileStack', {
                        screen: 'EditSurname',
                        params: { user: editingUser?.surname, id: uidData },
                    })
                    console.log('EditSurname')}
                }

            />

            <Button
                color='#b22bba'
                title="edit surname"
                onPress={() => {
                    navigation.navigate('ProfileStack', {
                        screen: 'EditSurname',
                        params: { user: editingUser?.surname, id: uidData },
                    })
                    console.log('EditSurname')
                }}
            />

            <Button
                color='#b22bba'
                title="LOGOUT"
                onPress={() => {
                    // logout()
                    console.log('logout')
                    Alert.alert('LOGOUT!')
                }}
            />
        </View>
    )
}

export default Profile


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: space / 2,
        marginTop: space * 1
    },
    headerText: {
        fontSize: 24,
        color: '#e03f16',
        margin: 8,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        elevation: cardElevation,
        justifyContent: 'space-between',
        padding: space,
    } as ViewStyle,
    nameText: {
        color: primaryTextColor,
        fontFamily: 'open-sans',
        fontSize: largeFontSize,
        padding: space,
    },
});