import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import auth from '@react-native-firebase/auth';
import useUser from '../hooks/useUser';
import { backgroundColor, borderColor, borderRadius, borderWidth, cardElevation, largeFontSize, primaryTextColor, space } from '../config/styleConstants';
import InputLine from '../components/InputLine'
import { useDocument } from 'react-firebase-hooks/firestore';
import { usersColRef } from '../config/firebaseCollections';
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
    // console.log('userData :>>:>>:>>:>>:>>:>>:>>:>> ', user);
    console.log('userData :>>:>>:>>:>>:>>:>>:>>:>> ', editingUser?.surname);
    console.log('userData :>>:>>:>>:>>:>>:>>:>>:>> ', editingUser?.phoneNumber);

    const phoneNumber = user?.phoneNumber ?? editingUser?.phoneNumber


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Profile</Text>
            <InputLine
                labelValue={phoneNumber}
                placeholder="Phone Number"
                iconType='phone'
                keyboardType="phone-pad"
                onChangeText={console.log('from edit comp object')}
                onPress={() => console.log('from edit comp object')}
                editable={false}

            />

            <InputLine
                labelValue={editingUser?.name}
                placeholder="Name & Surname"
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
            <InputLine
                labelValue={editingUser?.surname}
                placeholder="Name & Surname"
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

            <View>
                <Text style={styles.locationText}>
                    Edit Location
                </Text>

                <View style={{ flexDirection: 'row' }}>
                    <EditLocation
                        onPress={() => { }}
                        backgroundColor='#4287f5'
                        text='home'
                    />
                    <EditLocation
                        onPress={() => { }}
                        backgroundColor='#e32b56'
                        text='office1'
                    />
                    <EditLocation
                        onPress={() => { }}
                        backgroundColor='#e0b424'
                        text='office2'
                    />
                    <EditLocation
                        onPress={() => { }}
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
        color: '#694fad',
        margin: 8,
        fontWeight: 'bold',
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