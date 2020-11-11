import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, Divider, Title, } from 'react-native-paper';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

const Privacy = () => {

    const [state, setState] = useState({
        isLoggingIn: false,
        recordSecs: 0,
        recordTime: '00:00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
    })

    const audioRecorderPlayer = new AudioRecorderPlayer();


    const onStartRecord = async () => {
        const path = 'sdcard/hello.m4a';
        const audioSet: AudioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        console.log('AudioSet', audioSet);
        const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

        audioRecorderPlayer.addRecordBackListener((e) => {
            setState({
                ...state,
                recordSecs: e.current_position,
                recordTime: audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
            });
        });
        console.log(`uri: ${uri}`);
    }


    const onStopRecord = async () => {
        const result = await audioRecorderPlayer.stopRecorder()
        audioRecorderPlayer.removeRecordBackListener()
        setState({
            ...state,
            recordSecs: 0,
        })
        console.log(result)
    }



    const onStartPlay = async () => {
        console.log('onStartPlay')
        const path = 'hello.m4a'
        const msg = await audioRecorderPlayer.startPlayer(path)
        audioRecorderPlayer.setVolume(1.0)
        console.log(msg)
        audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.current_position === e.duration) {
                console.log('finished')
                audioRecorderPlayer.stopPlayer()
            }
            setState({
                ...state,
                currentPositionSec: e.current_position,
                currentDurationSec: e.duration,
                playTime: audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ),
                duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            })
        })
    }

    const onPausePlay = async () => {
        await audioRecorderPlayer.pausePlayer()
    }

    const onStopPlay = async () => {
        console.log('onStopPlay')
        audioRecorderPlayer.stopPlayer()
        audioRecorderPlayer.removePlayBackListener()
    };




    return (
        // <View>
        //     <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        //         Press me
        //     </Button>
        // </View>

        <Card style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
            {/* <Background> */}
            {/* <Logo /> */}
            {/* <Header>InstaPlayer</Header> */}
            <Title>{state.recordTime}</Title>
            <Button mode="contained" icon="record" onPress={() => onStartRecord()}>
                RECORD
        </Button>
            <Button
                icon="stop"
                mode="outlined"
                onPress={() => onStopRecord()}
            >
                STOP
        </Button>
            <Divider />
            <Title>{state.playTime} / {state.duration}</Title>
            <Button mode="contained" icon="play" onPress={() => onStartPlay()}>
                PLAY
        </Button>
            <Button
                icon="pause"
                mode="contained"
                onPress={() => onPausePlay()}
            >
                PAUSE
        </Button>
            <Button
                icon="stop"
                mode="outlined"
                onPress={() => onStopPlay()}
            >
                STOP
        </Button>
            {/* </Background> */}

        </Card>
    )
}

export default Privacy

const styles = StyleSheet.create({})
