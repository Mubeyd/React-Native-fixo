import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import React from 'react'
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { backgroundIconColor, borderColor, largeFontSize, paragraphFontSize, space, windowDimension } from '../config/styleConstants'

export interface Props {
    color: string
    iconName: any
    name: string
    onPress: any
}

const ServiceBox = (props: Props) => {

    return (
        <View style={styles.mainContainer}>
            <TouchableNativeFeedback
                onPress={props.onPress}
                style={styles.container}
            >
                <Text style={styles.text}>{props.name}</Text>
                <View>
                    <Image
                        style={styles.icon}
                        source={props.iconName}
                        resizeMode='center'
                    />
                </View>
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
        paddingVertical: space * 2,
        width: boxSize,
        height: boxSize / 1.8,
    },
    icon: {
        alignSelf: 'flex-end',
        width: boxSize / 4,
        height: boxSize / 4,
        marginRight: boxSize / 6,
    },
    text: {
        fontSize: largeFontSize,
        marginTop: space / 2,
        marginLeft: boxSize / 6,
        textAlign: 'left',
        color: '#fff',
    },
})
