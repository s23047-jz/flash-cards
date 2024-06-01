import React, { useCallback, useState } from "react";
import { ScreenProps } from "../../interfaces/screen";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ReportsService } from "../../services/reports";
import { useFocusEffect } from "@react-navigation/native";
import { Button, Card, Col, Loader, LoadingCard, Row} from "../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReportInterface } from "../../interfaces/reports";

const styles = StyleSheet.create({
    card: {
        height: 150,
    },
    row: {
        height: 75
    },
    avatar: {
        height: 50,
        width: 50
    },
    loadBtn: {
        maxWidth: 250
    }
});

const ReportedDecks: React.FC<ScreenProps> = ({ navigation }) => {
    const perPage = 4;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [reportsQuery, setReportsQuery] = useState({ search: '', page: 1, per_page: perPage });
    const [total, setTotal] = useState(0);

    const fetchReports = async() => {
        const reports_data = await ReportsService.getReportedDecksList(reportsQuery, navigation)
        if(data && data.length) setData(prevData => [...prevData, ...reports_data.reports]);
        else setData(reports_data.reports);
        setReportsQuery(prevState => ({ ...prevState, page: prevState.page + 1 }))
        setTotal(reports_data.total)
        setFetchLoading(false);
    }

    const setSearch = async(value: string) => {
        setLoading(true);
        setData([]);
        setReportsQuery(prevState => (
            {
                ...prevState,
                search: value,
                page: 1,
            }
        ))
        await fetchReports();
        setLoading(false);
    }

    const handleFetchMoreData = async() => {
        setFetchLoading(true);
        setTimeout(() => {
            fetchReports();
        }, 1000)
    };

    useFocusEffect(
        useCallback(() => {
            try {
                setLoading(true);
                setData([]);
                setReportsQuery({ search: '', page: 1, per_page: perPage });
                fetchReports();
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
            return () => {
            };
        }, [])
    )

    const ReportCard: React.FC<ReportInterface> = ({ id, deck_category, title, submitter_email }) => {
    return (
        <TouchableOpacity
            className={'w-full h-full mr-auto ml-auto mb-7'}
            style={styles.card}
            onPress={() => {}}
        >
            <Card className={'w-full h-full'}>
                <Row className={'w-full'}>
                    <Row className={'w-28 h-full'} />
                    <Row className={'w-24 h-full'}>
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
                    <Row className={'w-28 h-full'} >
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

    return (
        <View className="flex h-screen w-full bg-sky-500 dark:bg-blue-900">
            <View className="flex flex-container w-full mt-20 mb-5">
                <Row className='w-full p-6' style={styles.row}>
                    <Col className='w-full'>
                        <Text className="text-2xl text-white font-bold text-right">
                            Reports
                        </Text>
                    </Col>
                </Row>
                <Row className="w-full mt-5 justify-center text-center">
                    <Col className='w-full'>
                        <TextInput
                            className="h-10 w-72 border border-gray-300 rounded-xl px-3 mb-3 text-gray-700 bg-white mr-auto ml-auto"
                            placeholder="Search..."
                            value={reportsQuery.search}
                            onChangeText={setSearch}
                            autoCapitalize="none"
                        />
                        <MaterialCommunityIcons
                            position="absolute"
                            right="15%"
                            top="10%"
                            size={30}
                            className="w-max h-max"
                            name="magnify"
                            color="black"
                        />
                    </Col>
                </Row>
                <Row className="w-full h-4/6 mt-2">
                    { loading ? <Loader /> : data && data.length ? (
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
                            {fetchLoading ? [...Array(3)].map(() => <LoadingCard />) : null}
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
                                    There are no reports in the list.
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
