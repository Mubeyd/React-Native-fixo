import React, { useEffect, useState } from 'react'
import {
    StyleSheet, Text, View, ViewStyle, Modal,
    Alert, TouchableOpacity, TextInput, ScrollView,
    Picker, ImageBackground } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button } from '@ui-kitten/components';


import useUser from '../hooks/useUser';
import {
    backgroundColor, borderColor, borderRadius,
    borderWidth, cardElevation, largeFontSize,
    primaryTextColor, space } from '../config/styleConstants';
import InputLine from '../components/InputLine'
import { useDocument } from 'react-firebase-hooks/firestore';
import { addressesColRef, usersColRef } from '../config/firebaseCollections';
import EditLocation from '../components/EditLocation';
import ProfileNames from '../components/ProfileNames';
import { Address } from '../models/firestoreInterfaces';


export interface Props { }

const Cities = ['Gazinatep', 'Adana',]
const Provinces = ['Sahinbey', 'Sehitkamil']
const LocationTypes = ['Home', 'Office', 'Other']


const Profile = ({ navigation }: Props) => {
    const user = useUser()
    const uidData = user?.uid || 'no id'
    const [userDocSnapshot] = useDocument(usersColRef.doc(uidData))
    const editingUser = userDocSnapshot?.data()

    console.log('userData surname :>>:>>:>>:>>:>>:>>:>>:>> ', editingUser?.surname);


    const [modalVisible, setModalVisible] = useState(false);

    const [form, setState] = useState({
        country: 'Turkey',
        city: Cities[0],
        province: Provinces[0],
        details: editingUser?.address,
        latitude: 232344,
        longitude: 232344,
        locationType: LocationTypes[0],
    })

    const addAddress = async () => {
        let addressId: string
        const oldAddresses = userDocSnapshot.data()?.addresses || []

        const addressesSnapshot = await addressesColRef.where('id', 'array-contains', oldAddresses).get()
        const noAddress = addressesSnapshot.empty

        if (noAddress) {
            const newAddress = await addressesColRef.add({
                country: form.country,
                city: form.city,
                province: form.province,
                details: form.details,
                latitude: form.latitude,
                longitude: form.longitude,
                LocationTypes: form.locationType,
            } as Address)
            addressId = newAddress.id
        } else {
            addressId = addressesSnapshot.docs[0].id
            await addressesSnapshot.docs[0].ref.update({
                country: form.country,
                city: form.city,
                province: form.province,
                details: form.details,
                latitude: form.latitude,
                longitude: form.longitude,
                LocationTypes: form.locationType,
            })
        }

        await usersColRef.doc(uidData).set({ addresses: [...oldAddresses, addressId] }, { merge: true })
    }


    return (
        <ImageBackground
            source={require('../assets/serviceBack.png')}
            style={styles.backgroundImage}
            resizeMode='cover'
        >
            <ScrollView>

                <View style={styles.container}>
                    <Text style={styles.headerText}>Profile</Text>
                    <InputLine
                        labelValue={editingUser?.phoneNumber}
                        placeholder="Phone Number"
                        iconType='phone'
                        keyboardType="phone-pad"
                        onChangeText={() => {
                            // console.log('from edit comp object')
                        }}
                        onPress={() => {
                            // console.log('from edit comp object')
                        }}
                        editable={false}

                    />
                    <ProfileNames
                        firstName={editingUser?.name}
                        lastName={editingUser?.surname}
                        onPress={() => {
                            navigation.navigate('ProfileStack', {
                                screen: 'EditName',
                                params: { name: editingUser?.name, surname: editingUser?.surname, id: uidData },
                            })
                            console.log('EditName')
                        }}
                    />

                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    {/* <Text style={styles.headerText}>Location Info</Text> */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Text style={{ color: '#787' }}>Address Type</Text>
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={form.locationType}
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setState({ ...form, locationType: itemValue })
                                            }}
                                        >
                                            {LocationTypes.map((item, indexMap) => (
                                                <Picker.Item label={item} key={indexMap} value={item} />
                                            ))}
                                        </Picker>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Text style={{ color: '#787' }}>City</Text>
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={form.city}
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setState({ ...form, city: itemValue })
                                            }}
                                        >
                                            {Cities.map((item, indexMap) => (
                                                <Picker.Item label={item} key={indexMap} value={item} />
                                            ))}
                                        </Picker>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Text style={{ color: '#787' }}>Province</Text>
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={form.province}
                                            style={{ height: 50, width: 150 }}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setState({ ...form, province: itemValue })
                                            }}
                                        >
                                            {Provinces.map((item, indexMap) => (
                                                <Picker.Item label={item} key={indexMap} value={item} />
                                            ))}
                                        </Picker>
                                    </View>

                                    <View style={styles.textInputView} >
                                        <TextInput
                                            style={styles.textInputField}
                                            onChangeText={e => { setState({ ...form, details: e }) }}
                                            value={form.details}
                                            placeholder='Inpute your Address here'
                                            numberOfLines={2}
                                        />
                                        <Ionicons color='#7accff' name='location-outline' size={18} />
                                    </View>
                                    <Button
                                        style={{ marginTop: 8 }}
                                        status='basic'
                                        size='medium'
                                        accessoryRight={() => (<Ionicons color='#7accff' name='location-outline' size={18} />)}
                                        onPress={() => {
                                            console.log('get gps func. here')
                                        }}
                                    >
                                        Get gps location
                                </Button>
                                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                        <TouchableOpacity
                                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                            onPress={async () => {
                                                addAddress()
                                                // await usersColRef.doc(uidData).update({ address: address })
                                                setModalVisible(!modalVisible);
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Approve</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                            onPress={async () => {
                                                setModalVisible(!modalVisible);
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>

                    <View>
                        <Text style={styles.locationText}>
                            Edit Location
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <EditLocation
                                onPress={() => setModalVisible(true)}
                                backgroundColor='#4287f5'
                                text='home'
                            />
                            <EditLocation
                                onPress={() => { }}
                                backgroundColor='#e32b56'
                                text='office'
                            />
                            <EditLocation
                                onPress={() => { }}
                                backgroundColor='#e0b424'
                                text='other'
                            />
                            <EditLocation
                                onPress={() => { }}
                                backgroundColor='#4287f5'
                                text='+'
                            />
                        </View>

                    </View>
                </View>
            </ScrollView>
        </ImageBackground>

    )
}

export default Profile


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 164,
        width: 340,
        height: 460,
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
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textInputView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: space,
        marginBottom: 6,
        backgroundColor: '#fff',
        width: '90%',
        // height: 48,
        alignSelf: 'center',
        borderRadius: 24,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    textInputField: {
        // height: 44,
        width: '75%',
        borderRadius: 24,
        margin: 12,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
});