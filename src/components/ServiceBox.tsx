import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View, ViewStyle } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { backgroundIconColor, borderColor, largeFontSize, space, windowDimension } from '../config/styleConstants'

export interface Props {
    iconPath: any
    name: string
    onPress: any
    iconWidth: number
    iconHeight: number
}

const ServiceBox = (props: Props) => {

    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                style={styles.gradientImage}
                source={require('../assets/icons/Clip.png')}
            >
                <TouchableNativeFeedback
                    onPress={props.onPress}
                    style={styles.container}
                >
                    <Text style={styles.text}>{props.name}</Text>
                    <Image
                        style={[styles.icon, { width: props.iconWidth, height: props.iconHeight }]}
                        source={props.iconPath}
                    />
                </TouchableNativeFeedback>
            </ImageBackground>
        </View>
    )
}

export default ServiceBox

const boxSize = (windowDimension.width - space * 2) / 2 - space / 2
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: space / 2,
        backgroundColor: backgroundIconColor,
        borderColor: borderColor,
        borderRadius: space * 2,
        borderWidth: 1,


    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: boxSize,
        height: boxSize / 1.5,
    },
    icon: {
        alignSelf: 'flex-end',
        marginRight: boxSize / 8,
        marginTop: boxSize / 26,
        resizeMode: 'stretch'
    },
    text: {
        fontSize: largeFontSize,
        marginBottom: space / 1,
        marginLeft: boxSize / 10,
        textAlign: 'left',
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    gradientImage: {
        flex: 1,
        resizeMode: "cover",
    }
})
