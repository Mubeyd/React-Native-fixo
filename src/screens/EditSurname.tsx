import React, { useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import { Button, StyleSheet, Text, View } from 'react-native'
import InputLine from '../components/InputLine';
import { usersColRef } from '../config/firebaseCollections';
import { space } from '../config/styleConstants';

const EditSurname = ({ navigation, route }) => {

    const { user, id } = route.params;
    const [userUseDocSnapshot] = useDocument(usersColRef.doc(id ?? 'noUser'))
    const [surname, setSurname] = useState(user)

    const changeName = async () => {
        await usersColRef.doc(id).update({ surname: surname })
        console.log('userUseDocSnapshot :>> ', userUseDocSnapshot);
    }

    return (
        <View style={styles.container}>
            <Text>EditSurname</Text>
            <Text>{id}</Text>
            <Text>{user}</Text>
            <InputLine
                labelValue={surname}
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(e) => setSurname(e)}
                onPress={() => console.log('object :>> ')}
            />
            <Button
                color='#b22bba'
                title="changeName"
                onPress={() => {
                    changeName()
                    navigation.goBack()
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
