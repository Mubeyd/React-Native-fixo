import React from 'react'
import { StyleSheet, Text, View, Button, Alert, ViewStyle } from 'react-native'
import auth from '@react-native-firebase/auth';
import useUser from '../hooks/useUser';
import { backgroundColor, borderColor, borderRadius, borderWidth, cardElevation, largeFontSize, primaryTextColor, space } from '../config/styleConstants';
import ProfileInput from '../components/ProfileInput'


export interface Props { }

const Profile = ({ }: Props) => {
    const user = useUser()

    console.log('user PhoneNumber', user?.phoneNumber)
    console.log('user Id', user?.uid)
    console.log('user? :>> ', user?.name);

    const logout = async () => {
        try {
            await auth().signOut();
            console.log('logout success :>> ');
        } catch (e) {
            console.log('error logout', e)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Profile Screen</Text>
            <ProfileInput
                labelValue={user?.phoneNumber}
                placeholderText='sdfsfssdf'
                iconType='phone'
                keyboardType="phone-pad"

            />

            <ProfileInput
                labelValue={user?.name}
                placeholderText="uyftf"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <ProfileInput
                labelValue={user?.surname}
                placeholderText="uyftf"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
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