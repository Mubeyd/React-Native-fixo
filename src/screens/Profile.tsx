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

const Profile = ({navigation }: Props) => {
    const user = useUser()
    const uid = useUser()
    const uidData = uid?.uid
    const editingUserId: string | undefined = uidData


    const [fireAuthUser, loadingUser] = useAuthState(auth())

    console.log('fireAuthUser :>>:>>:>>', fireAuthUser?.uid);
    // const userData2 = useCollection



    const [userSnapshot, loadingUserSnapshot] = useCollection(
        usersColRef.where('phoneNumber', '==', (fireAuthUser as FirebaseAuthTypes.User)?.phoneNumber || '')
    )

    const user2 = (userSnapshot as FirebaseFirestoreTypes.QuerySnapshot)?.docs[0]
    const userData = user2?.data()

    const [userUseDocSnapshot] = useDocument(usersColRef.doc(editingUserId ?? 'noUser'))
    const editingUser = userUseDocSnapshot?.data()

    useEffect(() => { }, [editingUser])
    console.log('userData :>>:>>:>>:>>:>>:>>:>>:>> ', uidData);
    console.log('userData :>>:>>:>>:>>:>>:>>:>>:>> ', editingUser?.surname);
    console.log('userData :>>:>>:>>:>>:>>:>>:>>:>> ', editingUser?.id);
    // console.log('userData :>>:>>:>>:>>:>>:>>:>>:>> ', editingUser?.surname);

    // console.log('userData.phoneNumber :>> :>> ', userData?.phoneNumber);
    // console.log('userData.userName :>> :>> ', userData?.userName);
    // console.log('userData.surname :>> :>> ', userData?.surname);





    // console.log('user PhoneNumber', user?.phoneNumber)
    // console.log('user? :>> ', user?.userName);
    // console.log('user? :>> ', user?.surname);
    // console.log('user Id', user?.uid)

    const logout = async () => {
        try {
            await auth().signOut();
            console.log('logout success :>> ');
        } catch (e) {
            console.log('error logout', e)
        }
    }

    // const surname= `${userData?.surname ?? ''}`
    // const userName = userData?.userName
    // const surname = userData?.surname

    const userTrue = user ? user : false
    const userNameTrue = userTrue ? userTrue.userName : false

    console.log('userNameTrue :>> ', userNameTrue);


    const userId = String(fireAuthUser?.uid)
    if (typeof userId === 'string') {
        console.log('userId is string :>> ', userId);
    }



    const userDoc = async () => {
        await usersColRef.doc('gxZRUa2ZomSiHLfhDXZ1').get().then(async docSnapshot => {
            // console.log('docSnapshot.data() :>> ', data2331);
            const data2331 = await docSnapshot.data()
            if (docSnapshot.exists) {
                console.log('User id: ', docSnapshot.id);
                console.log('User data id: ', uid?.uid);
                console.log('User data name: ', uid?.surname);
            } else {
                console.log('no object');
            }
        })
    }
    // userDoc()
    // const userDocData = userDoc


    const formProps = useFormik<FormikFields>({
        initialValues: {
            phoneNumber: user?.phoneNumber ?? '+90',
            // userName: `${userNameTrue ?? 'aljfhsiesfsu'}`,
            userName: `${uid?.userName ? userNameTrue : 'aljfhsiesfsu'}`,
            surname: `${uid?.userName ?? 'sdsdfs'}`
        },
        onSubmit: async values => {
            let userId: string
            // const phoneNumber = userData?.phoneNumber ?? values.phoneNumber

            const data = {
                phoneNumber: values.phoneNumber,
                userName: values.userName,
                surname: values.surname,
                createdAt: firestore.FieldValue.serverTimestamp(),
            }

            let ref

            if (user?.uid) {
                // delete data.createdAt
                // ref = user.ref
            } else {
                // ref = usersColRef.doc()
            }

            // await 




        }
    })
    console.log('formProps.values.phoneNumber :>> ', formProps.values.phoneNumber);
    console.log('formProps.values.userName :>> ', formProps.values.userName);
    console.log('formProps.values.surname :>> ', formProps.values.surname);


    // useEffect(() => {},[formProps])

    const phoneNumber = user?.phoneNumber ?? formProps.values.phoneNumber



    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Profile Screen</Text>
            <Text style={styles.headerText}>{editingUser?.surname}</Text>
            <ProfileInput
                labelValue={phoneNumber}
                // placeholderText={formProps.values.phoneNumber}
                iconType='phone'
                keyboardType="phone-pad"
                onChangeText={formProps.handleChange('phoneNumber')}
            />

            <ProfileInput
                labelValue={formProps.values.userName}
                // labelValue={userName}
                // placeholderText="uyftf"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={formProps.handleChange('userName')}
            // editable={false}

            />
            <ProfileInput
                labelValue={formProps.values.surname}
                // labelValue={surname}
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
                title="edit surname"
                onPress={() => {
                    navigation.navigate('ProfileStack', {
                        screen: 'EditSurname',
                        params: { user: editingUser?.surname, id: uidData},
                      } )
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