import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Submit from '../components/Submit'
import TimeDate from '../components/TimeDate'
import VoiceRecorder from '../components/VoiceRecorder'

const BeaFIXO = () => {
    return (
        <View>
            <View style={{ margin: 12 }}>
                <VoiceRecorder />
            </View>
            <View style={{ margin: 12 }}>
                <TimeDate />
            </View>
            <View style={{ margin: 12 }}>
                <Submit />
            </View>
        </View>
    )
}

export default BeaFIXO

const styles = StyleSheet.create({})
