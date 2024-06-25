import React, {
    useCallback,
    useRef,
    useState,
    useEffect
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    Text,
    FlatList,
    Animated
} from "react-native";

import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import * as FileSystem from 'expo-file-system';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ScreenProps } from "../../interfaces/screen";
import { DecksService } from "../../services/decks";
import { NlpService } from "../../services/nlp";
import { LearningFlashCardsModeInterface } from "../../interfaces/flash_cards";
import {
    Loader,
    FlashCard,
    MicrophoneButton,
    VoiceControlInstructionModal
} from "../../components";

const LearningVoiceMode: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { deck } = route.params;

    const PERMISSIONS_MAPPING = {
        GRANTED: 'granted'
    }
    const VOICE_CONTROL_STAGES = {
        START: "start",
        STOP: "stop",
        END: "end",
    }

    const [loading, setLoading] = useState(true);
    const [flashCards, setFlashCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const showFrontCard= useRef(true);
    const [showModal, setShowModal] = useState(false);

    // Audio
    const recording = useRef(null);

    // Permissions
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    // voice control
    const [activeVoiceControlMode, setActiveVoiceControlMode] = useState(VOICE_CONTROL_STAGES.STOP);
    const [showMicrophoneModal, setShowMicrophoneModal] = useState(false);

    const scrollX = useRef(new Animated.Value(0)).current
    const flatListRef = useRef(null);
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current

    const [parentWidth, setParentWidth] = useState(0);
    const onParentLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    const handleCheckIfPermissionGranted = async() => {
        try {
            if (permissionResponse?.status !== PERMISSIONS_MAPPING.GRANTED) {
                const permission = await requestPermission();
                if (!permission.granted && permission.status === 'denied') navigation.goBack();
                else setShowModal(true);
            }
        } catch (err) {
            console.error('Failed to get permissions', err);
        }
    }

    const startRecording = async () => {
        try {
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording...');
            const recordingInstance = new Audio.Recording();
            await recordingInstance.prepareToRecordAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            await recordingInstance.startAsync();
            recording.current = recordingInstance;
            console.log('Recording started', recording);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        try {
            console.log('Stopping recording...', recording);
            if (recording.current) {
                await recording.current.stopAndUnloadAsync();
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    playsInSilentModeIOS: false,
                    staysActiveInBackground: false,
                });
                const uri = await recording.current.getURI();
                console.log("URI", uri)
                recording.current = null;
                setActiveVoiceControlMode(VOICE_CONTROL_STAGES.STOP);
                if (uri) {
                    await calculateSimilarity(uri)
                }
            } else {
                setActiveVoiceControlMode(VOICE_CONTROL_STAGES.STOP);
                console.error('No recording instance found');
            }
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    };

    const handleSpeech = (text: string) => {
        Speech.speak(text);
    }

    const handlePrevClick = async() => {
        console.log("currentCardIndex", currentCardIndex)
        if (currentCardIndex !== 0) {
            showFrontCard.current = true;
            flatListRef.current.scrollToIndex({ animated: true, index: currentCardIndex - 1 });
        }
    }

    const handleNextClick = async () => {
        if (currentCardIndex < flashCards.length - 1) {
            showFrontCard.current = true;
            flatListRef.current.scrollToIndex({animated: true, index: currentCardIndex + 1});
            setCurrentCardIndex(currentCardIndex + 1)
        } else {
            setCurrentCardIndex(currentCardIndex + 1)
            handleSpeech("End of Deck. You have completed this learning session");
            await handleEndRecognizing()
        }
    }

    const handleRotateClick = () => {
        showFrontCard.current = !showFrontCard.current;
    }

    const handleSpeakerClick = () => {
        if (currentCardIndex < flashCards.length - 1) {
            const currentCard: LearningFlashCardsModeInterface = flashCards[currentCardIndex];
            console.log('showFrontCard ? currentCard.title : currentCard.description', showFrontCard ? currentCard.title : currentCard.description)
            handleSpeech(showFrontCard ? currentCard.title : currentCard.description);
        }
    }

    const handleStopControl = async() => {
        await stopRecording();
    }

    const toggleMicrophoneStatus = async() => {
        if (activeVoiceControlMode === VOICE_CONTROL_STAGES.STOP) setActiveVoiceControlMode(VOICE_CONTROL_STAGES.START);
        else setActiveVoiceControlMode(VOICE_CONTROL_STAGES.STOP)
    }

    const handleEndRecognizing = async() => {
        setActiveVoiceControlMode(VOICE_CONTROL_STAGES.END);
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: false,
            staysActiveInBackground: false,
        });
        recording.current = null
        setShowMicrophoneModal(false);
    }

    const handleCommands = async(command: string) => {
        switch(command) {
            case "previous":
                await handlePrevClick();
                break;
            case "next":
                await handleNextClick();
                break;
            case "rotate":
                handleRotateClick();
                break;
            case "read":
                handleSpeakerClick();
                break;
            case "stop":
                await handleStopControl();
                break;
            default:
                handleSpeech("Sorry, I didn't recognize the command. Press button again to continue.");
                console.warn('Command not found');
                break;
        }
    }

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentCardIndex(viewableItems[0].index)
    }).current

    const calculateSimilarity = async(recordingURI: string) => {
        if (!recordingURI) return;
        try {
            const fileInfo = await FileSystem.getInfoAsync(recordingURI);
            if (!fileInfo.exists) return;
            const now = new Date();
            const formattedDate = now.getFullYear() + '-' +
                ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
                ('0' + now.getDate()).slice(-2) + '_' +
                ('0' + now.getHours()).slice(-2) + '-' +
                ('0' + now.getMinutes()).slice(-2) + '-' +
                ('0' + now.getSeconds()).slice(-2);

            const filename = `recording_${formattedDate}.m4a`;
            const fileUri = fileInfo.uri;
            const formData = new FormData();
            formData.append('file', {
                uri: fileUri,
                name: filename,
                type: 'audio/m4a',
            });
            const { res, data } = await NlpService.calculateSimilarityByFile(
                formData,
                navigation
            )
            if ([200, 201].includes(res.status)) {
                await FileSystem.deleteAsync(recordingURI);
                await handleCommands(data.command)
                if (data.command || data.command !== 'stop') {
                    setActiveVoiceControlMode(VOICE_CONTROL_STAGES.START)
                }
            } else {
                await handleCommands("Unknown")
            }
        }catch (err) {
            console.error("Something went wrong during the calculation", err)
            await calculateSimilarity(recordingURI)
        }
    }

    const handleVoiceVoiceControl = async() => {
        if (activeVoiceControlMode === VOICE_CONTROL_STAGES.START) {
            await startRecording();
            setTimeout( async () => {
                await stopRecording();
            }, 4000)
        }
    }

    async function fetchUnmemorizedFlashcards() {
        try {
            const data = await DecksService.read_not_memorized_flash_cards_from_deck(
            deck.id,
            navigation,
            );
            setFlashCards(data)
        } catch (error) {
            console.error("Error during the fetch:", error);
            throw new Error("Could not fetch data");
        }
    }

    useFocusEffect(
        useCallback(() => {
            setCurrentCardIndex(0)
            if (recording.current) {
                recording.current.stopAndUnloadAsync();
                recording.current = null;
                Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    playsInSilentModeIOS: false,
                    staysActiveInBackground: false,
                });
            }
            setLoading(true);
            fetchUnmemorizedFlashcards();
            setShowMicrophoneModal(true);
            setLoading(false);
            handleCheckIfPermissionGranted();
        }, []),
    );

    useEffect(() => {
        handleVoiceVoiceControl();
        return () => {
            setCurrentCardIndex(0)
            if (recording.current) {
                recording.current.stopAndUnloadAsync();
                recording.current = null;
                Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    playsInSilentModeIOS: false,
                    staysActiveInBackground: false,
                });
                recording.current = null
            }
        }
    }, [activeVoiceControlMode])

    if (loading) {
        return (
            <Loader />
        )
    }

    if (!flashCards.length || !(flashCards.length && currentCardIndex <= flashCards.length - 1)) {
        return (
            <View className="flex-1 bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
                <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-10">
                    Learning Voice Mode
                </Text>
                <View className="top-14 absolute left-6">
                    <MaterialCommunityIcons
                        onPress={() => navigation.goBack()}
                        size={30}
                        name="arrow-left-bold"
                        color="white"
                    />
                </View>
                <View className="flex-1 items-center mt-40">
                    <Text className="text-white font-extrabold m-3 animate-bounce scale-150">No cards available</Text>
                    <Text className="text-white font-extrabold m-3 animate-bounce scale-150">Create new flashcards</Text>
                    <Text className="text-white font-extrabold m-3 animate-bounce scale-150">or restart your deck in settings</Text>
                </View>
            </View>
        );
    }

    const renderItem = ({ item, index }) => {
        const { title, 'card text': cardText } = item;
        return (
            <FlashCard
                title={title}
                description={cardText}
                index={index}
                width={parentWidth}
                showFrontCard={showFrontCard.current}
            />
        );
    };

    return (
        <View className="flex-1 bg-sky-500 dark:bg-blue-900 placeholder-gray-400">
            <Text className="text-white font-extrabold animate-bounce scale-150 absolute top-16 right-10">
                Learning Voice Mode
            </Text>
            <VoiceControlInstructionModal visible={showModal} onClose={setShowModal} />
            <MicrophoneButton
                active={activeVoiceControlMode === VOICE_CONTROL_STAGES.START}
                show={showMicrophoneModal}
                onPress={toggleMicrophoneStatus}
            />
            <View className="top-14 absolute left-6">
                <MaterialCommunityIcons
                    onPress={() => navigation.goBack()}
                    size={30}
                    name="arrow-left-bold"
                    color="white"
                />
            </View>
            <View className="mt-28">
                <Text className="text-white font-extrabold mb-3 scale-150 font-bold text-center ">
                    {(flashCards.length - currentCardIndex)} flashcards left
                </Text>
            </View>
            <View className="flex-1" onLayout={onParentLayout}>
                <FlatList
                    ref={flatListRef}
                    data={flashCards}
                    initialNumToRender={flashCards.length}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator
                    pagingEnabled
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: false }
                            )}
                    scrollEventThrottle={32}
                    scrollEnabled={false}
                    viewabilityConfig={viewConfig}
                    onViewableItemsChanged={viewableItemsChanged}
                />
            </View>
            <View className="flex-row items-center justify-center" />
        </View>
    )
};

export default LearningVoiceMode;
