import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import logo from '../assets/logo.png'
import { backgroundColor, space, windowDimension } from '../config/styleConstants'

export interface Props {}

const Loading = ({}: Props) => {
    return (
        <View style={styles.container}>
            <Image resizeMode="contain" style={styles.logo} source={logo} />
        </View>
    )
}

export default Loading
const imageWidth = windowDimension.width - space * 4

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: backgroundColor,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        height: imageWidth * 0.4,
        marginHorizontal: space * 2,
        width: imageWidth,
    },
})
