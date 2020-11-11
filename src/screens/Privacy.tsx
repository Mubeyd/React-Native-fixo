import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, Divider, Title, } from 'react-native-paper';
import { Button as Buttonk } from '@ui-kitten/components'
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

    // const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(new AudioRecorderPlayer());
    const audioRecorderPlayer = new AudioRecorderPlayer()


    const onStartRecord = async () => {
        try {
            const path = 'sdcard/hello.mp4';
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
        } catch (e) {
            console.log('e :>> ', e);
        }
    }


    const onStopRecord = async () => {
        try {
            const result = await audioRecorderPlayer.stopRecorder()
            audioRecorderPlayer.removeRecordBackListener()
            setState({
                ...state,
                recordSecs: 0,
            })
            console.log(result)
        } catch (e) {
            console.log('e :>> ', e);
        }
    }



    const onStartPlay = async () => {
        try {
            console.log('onStartPlay')
            const path = 'sdcard/hello.mp4'
            const msg = await audioRecorderPlayer.startPlayer(path)
            audioRecorderPlayer.setVolume(1.0)
            console.log(msg)
            console.log(path)
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
        } catch (e) {
            console.log('e :>> ', e);
        }
    }

    const onPausePlay = async () => {
        try {
            await audioRecorderPlayer.pausePlayer()
        } catch (e) {
            console.log('e :>> ', e);
        }
    }

    const onStopPlay = async () => {
        try {
            console.log('onStopPlay')
            audioRecorderPlayer.stopPlayer()
            audioRecorderPlayer.removePlayBackListener()
        } catch (e) {
            console.log('e :>> ', e);
        }
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
            <Buttonk
                status='danger'
                size='large'
                onPress={() => { }} >
                Record
            </Buttonk>
            <Buttonk
                status='warning'
                size='large'
                onPress={() => onStopRecord()} >
                Stop
            </Buttonk>
            <Buttonk
                status='success'
                size='large'
                onPress={() => { }} >
                Play
            </Buttonk>

        </Card>
    )
}

export default Privacy

const styles = StyleSheet.create({})
