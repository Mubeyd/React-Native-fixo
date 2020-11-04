import React, { useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import InputLine from '../components/InputLine';
import InputLineUser from '../components/InputLineUser';
import { usersColRef } from '../config/firebaseCollections';
import { space } from '../config/styleConstants';

const EditName = ({ navigation, route }) => {

    const { name, surname, id } = route.params;
    const [userUseDocSnapshot] = useDocument(usersColRef.doc(id ?? 'noUser'))

    const [form, setState] = useState({
        firstName: name,
        lastName: surname
    });

    const changeName = async () => {
        await usersColRef.doc(id).update({ name: form.firstName, surname: form.lastName })
        console.log('userUseDocSnapshot :>> ', userUseDocSnapshot);
    }

    return (
        <View style={styles.container}>
            <InputLineUser
                text='First Name'
                labelValue={form.firstName}
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(e) => setState({ ...form, firstName: e })}
                onPress={() => console.log('object :>> ')}
                placeholder="Name & Surname"
            />
            <InputLineUser
                text='Last Name'
                labelValue={form.lastName}
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(e) => setState({ ...form, lastName: e })}
                onPress={() => console.log('object :>> ')}
                placeholder="Name & Surname"
            />
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={async () => {
                        changeName()
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.textStyle}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={async () => {
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.textStyle}>Return</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditName

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: space / 2,
        marginTop: space * 2
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 18,
        padding: 10,
        elevation: 2,
        margin: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
})
