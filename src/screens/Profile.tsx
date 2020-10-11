import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button, Alert, ViewStyle } from 'react-native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import useUser from '../hooks/useUser';
import { backgroundColor, borderColor, borderRadius, borderWidth, cardElevation, largeFontSize, primaryTextColor, space } from '../config/styleConstants';
import ProfileInput from '../components/ProfileInput'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { usersColRef } from '../config/firebaseCollections';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import EditLocation from '../components/EditLocation';


export interface Props { }

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
                onPress={() => {
                    navigation.navigate('ProfileStack', {
                        screen: 'EditName',
                        params: { user: editingUser?.name, id: uidData },
                    })
                    console.log('EditName')
                }
                }

            />
            <ProfileInput
                labelValue={editingUser?.surname}
                iconType="edit"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={console.log('from edit comp object')}
                editable={false}
                onPress={() => {
                    navigation.navigate('ProfileStack', {
                        screen: 'EditSurname',
                        params: { user: editingUser?.surname, id: uidData },
                    })
                    console.log('EditSurname')
                }
                }

            />

            {/* <Button
                color='#b22bba'
                title="LOGOUT"
                onPress={() => {
                    // logout()
                    console.log('logout')
                    Alert.alert('LOGOUT!')
                }}
            /> */}

            <View>
                <Text style={styles.locationText}>
                    Edit Location
                </Text>

                <View style={{flexDirection: 'row'}}>
                    <EditLocation
                        backgroundColor='#4287f5'
                        text='home'
                    />
                    <EditLocation
                        backgroundColor='#e32b56'
                        text='home'
                    />
                    <EditLocation
                        backgroundColor='#e0b424'
                        text='home'
                    />
                    <EditLocation
                        backgroundColor='#4287f5'
                        text='+'
                    />
                </View>

            </View>
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
    locationText: {
        fontSize: 24,
        color: '#4287f5',
        margin: space,
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