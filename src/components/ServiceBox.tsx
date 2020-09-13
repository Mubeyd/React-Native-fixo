import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { backgroundIconColor, borderColor, paragraphFontSize, space, windowDimension } from '../config/styleConstants'

export interface Prop {
    color: string
    iconName: string
    name: string
}

const ServiceBox = (props: Prop, navigate: any) => {

    return (
        <View style={styles.mainContainer}>
            <TouchableNativeFeedback
                onPress={() => navigate()}
                style={styles.container}
            >
                <MaterialCommunityIcons
                    name={props.iconName}
                    style={[
                        styles.icon,
                        {
                            color: props.color,
                        },
                    ]}
                    onPress={() => {
                        navigate()
                    }}
                />
                <Text style={styles.text}>{props.name}</Text>
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
        fontSize: paragraphFontSize,
        marginTop: space,
        textAlign: 'center',
        color: '#fff'
    },
})
