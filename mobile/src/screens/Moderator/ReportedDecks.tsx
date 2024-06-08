import React, { useCallback, useState, useRef } from "react";
import { ScreenProps } from "../../interfaces/screen";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ReportsService } from "../../services/reports";
import { useFocusEffect } from "@react-navigation/native";
import {
    Button,
    Card,
    CModal,
    Col,
    DotsLoader,
    Loader,
    Row
} from "../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReportInterface } from "../../interfaces/reports";
import { styles as mainStyles } from "../../assets/styles";

const styles = StyleSheet.create({
    ...mainStyles,
    row: {
        height: 85
    },
    avatar: {
        height: 50,
        width: 50
    },
});

const ReportedDecks: React.FC<ScreenProps> = ({ navigation }) => {
    const perPage = 4;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [firstFetchLoading, setFirstFetchLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [search, setSearch] = useState("")
    const reportsQuery = useRef({ page: 1, per_page: perPage })
    const [total, setTotal] = useState(0);

    const fetchReports = async() => {
        const reports_data = await ReportsService.getReportedDecksList({ ...reportsQuery, search }, navigation)
        if(data && data.length) setData(prevData => [...prevData, ...reports_data.reports]);
        else setData(reports_data.reports);
        setTotal(reports_data.total)
        setFetchLoading(false);
    }

    const handleSearch = async() => {
        setFirstFetchLoading(true);
        setData([]);
        await fetchReports();
        setFirstFetchLoading(false);
    }

    const handleFetchMoreData = async() => {
        setFetchLoading(true);
        reportsQuery.current = { ...reportsQuery.current, page: 1 };
        await fetchReports();
    };

    useFocusEffect(
        useCallback(() => {
            try {
                setLoading(true);
                setFirstFetchLoading(true);
                reportsQuery.current = { page: 1, per_page: perPage };
                setData([]);
                setSearch("")
                fetchReports();
                setLoading(false);
                setFirstFetchLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
            return () => {
            };
        }, [])
    )

    const handleDeleteReport = async(deckId: string) => {
        await ReportsService.deleteReport(deckId, navigation);
        setLoading(true);
        reportsQuery.current = { page: 1, per_page: perPage };
        setData([]);
        await fetchReports();
        setLoading(false);
    }

    const ReportCard: React.FC<ReportInterface> = ({ id, deck_category, title, submitter_email }) => {
        const [showMenuModal, setShowMenuModal] = useState(false);

        const MenuModal = () => {
            return (
                <CModal
                    visible={showMenuModal}
                    animationType={'fade'}
                    transparent={true}
                >
                    <View className={'bg-sky-500 dark:bg-blue-900 w-full p-4 rounded-xl'}>
                        <ScrollView>
                            <Row className={'w-full mt-5'}>
                                <Col className={'w-full mb-4 text-center'}>
                                    <Button onPress={() => handleDeleteReport(id)}
                                            className={'p-1 w-52 text-center mr-auto ml-auto'}>
                                        <Text className={'text-lg ml-auto mr-auto font-bold'}>
                                            Delete
                                        </Text>
                                    </Button>
                                </Col>
                                <Col className={'w-full mb-4 text-center'}>
                                    <TouchableOpacity
                                        className={'p-1 w-52 text-center mr-auto ml-auto'}
                                        onPress={() => setShowMenuModal(false)}
                                        disabled={false}
                                    >
                                        <Text className={'text-lg ml-auto mr-auto font-bold'}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        </ScrollView>
                    </View>
                </CModal>
            )
        }

        return (
            <TouchableOpacity
                className={'w-full h-full mr-auto ml-auto mb-7'}
                style={styles.card}
                onPress={() => {}}
                onLongPress={() => setShowMenuModal(true)}
            >
                { MenuModal() }
                <Card className={'w-full h-full'}>
                    <Row className={'w-full'}>
                        <Row className={'h-full'} style={styles.cardRows} />
                        <Row className={'h-full'} style={styles.cardRows}>
                            <Col className={'w-full justify-center items-center'}>
                                <Text className={'text-center font-bold'}>
                                    { title }
                                </Text>
                            </Col>
                            <Col className={'w-full'}>
                                <Text className={'text-center'}>
                                    { deck_category }
                                </Text>
                            </Col>
                        </Row>
                        <Row className={'h-full'} style={styles.cardRows}>
                            <Col className={'w-full'}>
                                <Text className={'text-center font-bold'}>
                                    Submitter
                                </Text>
                            </Col>
                            <Col className={'w-full'}>
                                <Text className={'text-center'}>
                                    { submitter_email }
                                </Text>
                            </Col>
                        </Row>
                    </Row>
                </Card>
            </TouchableOpacity>
        )
    };

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <View className="flex flex-container w-full mt-20 mb-5">
                <Row className='w-full p-6' style={styles.row}>
                    <Col className='h-full justify-center align-middle' style={styles.col}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text className='text-2xl text-white font-bold ml-4'>
                                <MaterialCommunityIcons name={'arrow-left-bold'} size={24}/>
                            </Text>
                        </TouchableOpacity>
                    </Col>
                    <Col className='h-full justify-center align-middle' style={styles.col}>
                        <Text className='text-2xl text-white font-bold text-right mr-4'>
                            Reports
                        </Text>
                    </Col>
                </Row>
                <Row className="w-full mt-5 justify-center text-center">
                    <Col className='w-full items-center justify-center'>
                        <Row>
                            <TextInput
                                className="h-10 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white mr-auto ml-auto"
                                placeholder="Search..."
                                value={search}
                                onChangeText={setSearch}
                                onBlur={() => handleSearch()}
                                autoCapitalize="none"
                            />
                            <MaterialCommunityIcons
                                position="absolute"
                                right="1%"
                                top="10%"
                                size={30}
                                className="w-max h-max"
                                name="magnify"
                                color="black"
                            />
                        </Row>
                    </Col>
                </Row>
                <Row className="w-full h-4/6 mt-2">
                    { firstFetchLoading ? <DotsLoader /> : data && data.length ? (
                        <ScrollView
                            className='flex text-center align-middle w-full p-6 h-1/4'
                            scrollEventThrottle={16}
                        >
                            { data.map((item) =>
                                    <ReportCard
                                        key={item.id}
                                        id={item.id}
                                        deck_category={item.deck_category}
                                        title={item.title}
                                        submitter_email={item.submitter_email}
                                    />
                                )}
                            {fetchLoading ? <Row className={'w-full mt-2 mb-2'}><DotsLoader /></Row> : null}
                            {
                                ((data.length % 4 === 0) && !(data.length === total)) ?
                                    <Row className={'w-full'}>
                                        <Col className={'w-full justify-center items-center mb-3'}>
                                            <Button
                                                className={'p-3 w-52 text-center mr-auto ml-auto mb-3'}
                                                style={styles.loadBtn}
                                                onPress={async () => handleFetchMoreData()}
                                            >
                                                <Text className={'text-center text-lg font-bold'}>
                                                    Load more
                                                </Text>
                                            </Button>
                                        </Col>
                                    </Row>
                                    : null
                            }

                        </ScrollView>
                    ) : (
                        <Row className='w-full mt-10'>
                            <Col className='w-full'>
                                <Text className='font-bold text-xl text-center'>
                                    There are no users in the list.
                                </Text>
                            </Col>
                        </Row>
                    )}
                </Row>
            </View>
        </View>
    )
}

export default ReportedDecks;
