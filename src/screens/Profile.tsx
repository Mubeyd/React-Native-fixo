import React from 'react'
import { StyleSheet, Text, View, Button, Alert, ViewStyle } from 'react-native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useFormik } from 'formik'
import useUser from '../hooks/useUser';
import { backgroundColor, borderColor, borderRadius, borderWidth, cardElevation, largeFontSize, primaryTextColor, space } from '../config/styleConstants';
import ProfileInput from '../components/ProfileInput'
import { useCollection } from 'react-firebase-hooks/firestore';
import { usersColRef } from '../config/firebaseCollections';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';


export interface Props { }

interface FormikFields {
    phoneNumber: string
    userName: string
    surname: string
}

const Profile = ({ }: Props) => {
    const user = useUser()

    const [fireAuthUser, loadingUser] = useAuthState(auth())



    const [userSnapshot, loadingUserSnapshot] = useCollection(
        usersColRef.where('phoneNumber', '==', (fireAuthUser as FirebaseAuthTypes.User)?.phoneNumber || '')
    )

    const user2 = (userSnapshot as FirebaseFirestoreTypes.QuerySnapshot)?.docs[0]
    const userData = user2?.data()

    console.log('userData.phoneNumber :>> :>> ', userData?.phoneNumber);



    console.log('user PhoneNumber', user?.phoneNumber)
    console.log('user? :>> ', user?.userName);
    console.log('user? :>> ', user?.surname);
    // console.log('user Id', user?.uid)

    const logout = async () => {
        try {
            await auth().signOut();
            console.log('logout success :>> ');
        } catch (e) {
            console.log('error logout', e)
        }
    }


    const formProps = useFormik<FormikFields>({
        initialValues: {
            phoneNumber: '+90',
            userName: `${user?.userName ?? ''}`,
            surname: `${user?.surname ?? ''}`
        },
        onSubmit: async values => {
        }
    })
    console.log('values.phoneNumber :>> ', formProps.values.phoneNumber);
    console.log('values.userName :>> ', formProps.values.userName); 
    console.log('values.surname :>> ', formProps.values.surname); 
    
    const phoneNumber = user?.phoneNumber ?? formProps.values.phoneNumber



    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Profile Screen</Text>
            <ProfileInput
                labelValue={phoneNumber}
                // placeholderText={formProps.values.phoneNumber}
                iconType='phone'
                keyboardType="phone-pad"
                onChangeText={formProps.handleChange('phoneNumber')}
            />

            <ProfileInput
                labelValue={formProps.values.userName}
                // placeholderText="uyftf"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={formProps.handleChange('userName')}
            />
            <ProfileInput
                labelValue={formProps.values.surname}
                // placeholderText="uyftf"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={formProps.handleChange('surname')}
            />

            {/* <View style={styles.card}>
                <Text style={styles.nameText}>Number: {user?.phoneNumber}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.nameText}>Name: {user?.name}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.nameText}>Surname: {user?.surname}</Text>
            </View> */}

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