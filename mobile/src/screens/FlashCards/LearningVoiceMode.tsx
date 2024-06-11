import React, { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    View,
    Text,
    FlatList,
    Alert,
    Animated
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScreenProps } from "../../interfaces/screen";
import { DecksService } from "../../services/decks";
import { FlashCardsService } from "../../services/flashcards";
import {
    Loader,
    FlashCard
} from "../../components";

const LearningVoiceMode: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { deck } = route.params;

    const [loading, setLoading] = useState(true);
    const [flashCards, setFlashCards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [memorizedCards, setMemorizedCards] = useState([]);
    const [alertShown, setAlertShown] = useState(true);

    const scrollX = useRef(new Animated.Value(0)).current
    const flatListRef = useRef(null);
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current

    const [parentWidth, setParentWidth] = useState(0);
    const onParentLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
    };

    const handleCardNavigation = (memorized: boolean, index: number) => {
        const memorizedCard = memorized ? {
            id: flashCards[index].id,
            is_memorized: true
        } : null;

        if (index < flashCards.length - 1) {
            setCurrentCardIndex(index + 1);
            if (memorizedCard) {
                setMemorizedCards(prevMemorizedCards => [...prevMemorizedCards, memorizedCard]);
            }
            // @ts-ignore
            flatListRef.current.scrollToIndex({ animated: true, index: index + 1 });
        } else {
            const updatedMemorizedCards = memorizedCard ? [...memorizedCards, memorizedCard] : memorizedCards;
            Alert.alert(
                "End of Deck",
        "You have completed this learning session!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            if (updatedMemorizedCards.length > 0) {
                                console.log("JEJEJ")
                                // FlashCardsService.updateFlashcards(updatedMemorizedCards, navigation)
                                //     .then(() => navigation.goBack())
                                //     .catch(error => {
                                //         console.error("Error updating memorized cards:", error);
                                //         navigation.goBack();
                                //     });
                            } else {
                                navigation.goBack();
                            }
                        }
                    }]
            );
            setAlertShown(true);
        }
    };
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
            setAlertShown(flashCards.length > 0)
            setLoading(false);
        }, []),
    );

    if (loading) {
        return (
            <Loader />
        )
    }

    if (!flashCards.length || alertShown) {
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
                handleCardNavigation={handleCardNavigation}
                index={index}
                width={parentWidth}
            />
        );
    };

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
            <View className="mt-28">
                <Text className="text-white font-extrabold mb-3 scale-150 font-bold text-center ">
                    {(flashCards.length - currentCardIndex)} flashcards left
                </Text>
            </View>
            <View className="flex-1 bg-black" onLayout={onParentLayout}>
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
                />
            </View>
        </View>
    )
};

export default LearningVoiceMode;
