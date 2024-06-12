import {
    useCallback,
    useState,
    useEffect
} from "react";

import Voice, {
    SpeechErrorEvent,
    SpeechResultsEvent
} from "@react-native-voice/voice";

interface IState {
    error: string
    started: boolean
    recognized: boolean
    results: string[]
    isRecording: boolean
    end: boolean
}

export const useVoiceRecognition = () => {
    const [state, setState] = useState<IState>({
        error: '',
        started: false,
        recognized: false,
        results: [],
        isRecording: '',
        end: false
    });

    const resetState = useCallback(() => {
        setState({
            error: '',
            started: false,
            recognized: false,
            results: [],
            isRecording: '',
            end: false
        })
    }, [setState])

    const startRecognizing = useCallback(async () => {
        try {
            resetState();
            await Voice.start('en-GB')
        } catch (error) {
            console.error('Voice start error:', error);
        }
    }, [])

    const stopRecognizing = useCallback(async () => {
        try {
            await Voice.stop();
        } catch (error) {
            console.error('Voice stop error:', error);
        }
    }, [])

    const cancelRecognizing = useCallback(async () => {
        try {
            await Voice.cancel();
        } catch (error) {
            console.error('Voice stop error:', error);
        }
    }, [])

    const destroyRecognizing = useCallback(async () => {
        try {
            await Voice.destroy().then(Voice.removeAllListeners);
        } catch (error) {
            console.error('Voice stop error:', error);
        }
        resetState()
    }, [resetState])

    useEffect(() => {
        Voice.onSpeechStart = (e: any) => {
            setState((prevState) => ({...prevState, started: true, isRecording: true}));
        }
        Voice.onSpeechRecognized = (e: any) => {
            setState((prevState) => ({...prevState, recognized: true}));
        }
        Voice.onSpeechResults = (e: SpeechResultsEvent) => {
            if (e.value) {
                setState((prevState) => ({...prevState, results: e.value!}));
            }
        }
        Voice.onSpeechError = (e: SpeechErrorEvent) => {
            console.error(e.error)
            setState((prevState) => ({...prevState, error: JSON.stringify(e.error)}));
        }
        Voice.onSpeechEnd = (e: any) => {
            setState((prevState) => ({...prevState, end: true}));
        }

        return () => {
            Voice.destroy().then(Voice.removeAllListeners)
        }
    }, []);

    return {
        state,
        setState,
        resetState,
        startRecognizing,
        stopRecognizing,
        cancelRecognizing,
        destroyRecognizing
    }
}
