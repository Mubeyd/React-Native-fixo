import React, { useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import { Button, StyleSheet, Text, View } from 'react-native'
import ProfileInput from '../components/ProfileInput';
import { usersColRef } from '../config/firebaseCollections';
import { space } from '../config/styleConstants';

const EditSurname = ({navigation, route  }) => {

    const { user, id } = route.params;
    const [userUseDocSnapshot] = useDocument(usersColRef.doc(id ?? 'noUser'))
    // const editingUser = user?.data()
    // console.log('userData :>>:>>:>>:>>:>>:>>:>>:>> ', userUseDocSnapshot);

    const [surname, setSurname] = useState(user)

    console.log('surname :>> ', surname);

    const changeName = async () => {

        await usersColRef.doc(id).update({ surname: surname })

        console.log('userUseDocSnapshot :>> ', userUseDocSnapshot);
    }




    return (


        <View style={styles.container}>
            <Text>EditSurname</Text>
            <Text>{id}</Text>
            <Text>{user}</Text>
            <ProfileInput
                labelValue={surname}
                // labelValue={surname}
                // placeholderText="uyftf"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(e) => setSurname(e)}
            />
            <Button
                color='#b22bba'
                title="changeName"
                onPress={() => {
                    navigation.navigate('ProfileStack', {
                        screen: 'Profile'
                    })
                    changeName()
                }}
            />
        </View>
    )
}

export default EditSurname

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: space / 2,
        marginTop: space * 1
    },
})
