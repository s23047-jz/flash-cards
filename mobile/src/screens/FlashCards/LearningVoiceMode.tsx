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
    Animated,
    Button
} from "react-native";

import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ScreenProps } from "../../interfaces/screen";
import { DecksService } from "../../services/decks";
import { NlpService } from "../../services/nlp";
import { LearningFlashCardsModeInterface } from "../../interfaces/flash_cards";
import {
    Loader,
    FlashCard,
    MicrophoneButton
} from "../../components";

const LearningVoiceMode: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { deck } = route.params;

    const PERMISSIONS_MAPPING = {
        GRANTED: 'granted'
    }
    const VOICE_CONTROL_STAGES = {
        RUN: "run",
        STOP: "stop",
        END: "end",
    }

    const [loading, setLoading] = useState(true);
    const [flashCards, setFlashCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const showFrontCard= useRef(true);

    // Audio
    const [recording, setRecording] = useState<Audio.Recording | null>(null);

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
                console.log('Requesting permission...');
                await requestPermission();
            }
        } catch (err) {
            console.error('Failed to get permissions', err);
        }
    }

    const startRecording = async () => {
        try {
            if (recording) {
                console.log('Stopping existing recording before starting a new one.');
                await recording.stopAndUnloadAsync();
                setRecording(null);
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording...');
            const recordingInstance = new Audio.Recording();
            await recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recordingInstance.startAsync();
            setRecording(recordingInstance);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        try {
            console.log('Stopping recording...');
            if (recording) {
                await recording.stopAndUnloadAsync();
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                });
                const uri = recording.getURI();
                setRecording(null);
                console.log('Recording stopped and stored at', uri);
            } else {
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
        if (currentCardIndex !== 0) {
            showFrontCard.current = true;
            flatListRef.current.scrollToIndex({ animated: true, index: currentCardIndex - 1 });
        }
    }

    const handleNextClick = async () => {
        if (currentCardIndex < flashCards.length - 1) {
            showFrontCard.current = true;
            flatListRef.current.scrollToIndex({animated: true, index: currentCardIndex + 1});
        } else {
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
            handleSpeech(showFrontCard ? currentCard.title : currentCard.description);
        }
    }

    const handleStopControl = async() => {
        // await stopRecognizing();
        setActiveVoiceControlMode(VOICE_CONTROL_STAGES.STOP);
    }

    const toggleMicrophoneStatus = async() => {
        if (activeVoiceControlMode === VOICE_CONTROL_STAGES.STOP) {
            setActiveVoiceControlMode(VOICE_CONTROL_STAGES.RUN);
        } else {
            await handleStopControl()
        }
    }

    const handleEndRecognizing = async() => {
        // await destroyRecognizing();
        setActiveVoiceControlMode(VOICE_CONTROL_STAGES.END);
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
                handleSpeech("Sorry, I didn't recognize the command");
                console.warn('Command not found');
                break;
        }
    }

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentCardIndex(viewableItems[0].index)
    }).current

    const calculateSimilarity = async(text: string) => {
        try {
            const { data } = await NlpService.calculateSimilarity(
                { text },
                navigation
            )
            await handleCommands(data)
        }catch (err) {
            console.error("Something went wrong during the calculation", err)
        }
    }

    const handleVoiceVoiceControl = async() => {}

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
            setLoading(true);
            fetchUnmemorizedFlashcards();
            setShowMicrophoneModal(true);
            setLoading(false);
            setActiveVoiceControlMode(VOICE_CONTROL_STAGES.RUN)
            handleCheckIfPermissionGranted();
            stopRecording();
        }, []),
    );

    useEffect(() => {
        handleVoiceVoiceControl();
    }, [activeVoiceControlMode])

    if (loading) {
        return (
            <Loader />
        )
    }

    if (!flashCards.length || !(flashCards.length && currentCardIndex < flashCards.length - 1)) {
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
            <MicrophoneButton
                active={true}
                show={showMicrophoneModal}
                toggleMicrophoneStatus={toggleMicrophoneStatus}
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
                <Button
                    title={recording ? 'Stop Recording' : 'Start Recording'}
                    onPress={recording ? stopRecording : startRecording}
                />
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
