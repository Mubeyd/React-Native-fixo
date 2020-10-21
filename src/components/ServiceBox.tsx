import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import React from 'react'
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { backgroundIconColor, borderColor, largeFontSize, paragraphFontSize, space, windowDimension } from '../config/styleConstants'

export interface Props {
    // color: string
    iconPath: any
    name: string
    onPress: any
    iconWidth: number
    iconHeight: number
}

const ServiceBox = (props: Props) => {

    return (
        <View style={styles.mainContainer}>
            <TouchableNativeFeedback
                onPress={props.onPress}
                style={styles.container}
            >
                {/* <Image
                        style={styles.gradientImage}
                        source={require('../assets/icons/Clip.png')}
                    >

                    </Image> */}
                <Text style={styles.text}>{props.name}</Text>
                <Image
                    style={[styles.icon, { width: props.iconWidth, height: props.iconHeight }]}
                    source={props.iconPath}
                />
            </TouchableNativeFeedback>
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
    },
    container: {
        flexDirection: 'column',
        backgroundColor: backgroundIconColor,
        borderColor: borderColor,
        borderRadius: space * 2,
        borderWidth: 1,
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
    },
    gradientView: {
        // backgroundColor: '#546467',
        // borderRadius: space * 2,
    },
    gradientImage: {
        resizeMode: 'stretch',
        width: 90,
        height: 90,
        opacity: 0.5,
    }
})
