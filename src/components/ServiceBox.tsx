import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { backgroundIconColor, borderColor, largeFontSize, paragraphFontSize, space, windowDimension } from '../config/styleConstants'

export interface Props {
    color: string
    iconName: string
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
                <MaterialCommunityIcons
                    name={props.iconName}
                    style={[
                        styles.icon,
                        {
                            color: props.color,
                        },
                    ]}
                    // onPress={() => {
                    //     navigate()
                    // }}
                />
            </TouchableNativeFeedback>
        </View>
    )
}

export default ServiceBox

const boxSize = (windowDimension.width - space * 2) / 2 - space / 2
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
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
        fontSize: space * 4,
    } as ViewStyle,
    mainContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: space / 2,
    },
    text: {
        fontSize: largeFontSize,
        marginTop: space,
        textAlign: 'left',
        color: '#fff'
    },
})
