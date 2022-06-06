import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Linking, TextInput } from 'react-native';
import { View, Text, Carousel, Image, Card, Button, Chip, TouchableOpacity, Badge, Icon, Modal } from 'react-native-ui-lib';
import ContentLoader, { FacebookLoader, InstagramLoader, Bullets } from "react-native-easy-content-loader";
import axios from 'axios';
// Import Icon
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Import getEnvVars() from env
import getEnvVars from '../../../env';

// Import helper
import { Helper } from '../../helpers/index';

// Import Loader
import {NetworkIncorruptLoader} from '../../components/NetworkIncorruptLoader';

const { apiUrl, feedUrl } = getEnvVars();

type Props = {
    navigation: any;
}

const IMAGES = [
    'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?cs=srgb&dl=pexels-pixabay-60504.jpg&fm=jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg?cs=srgb&dl=pexels-pixabay-207580.jpg&fm=jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-5380642.jpg&fm=jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
];

interface TagDetail {
    term?: string;
    scheme?: string;
    label?: string;
}

interface Source {
    timestamp: string;
    'news.date': string;
    'news.source': string;
    'news.title': string;
    tags: TagDetail | TagDetail[] ;
    author: string;
    'news.detail': string;
    reference: string;
}

interface RSSFeed {
    _source: Source
}

const BodyScreen: React.FC<Props> = ({ navigation }) => {
    const [autoplay, setAutoPlay] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [isNetworkInCorrupt, setNetworkInCorrupt] = useState(false);
    const auth = useSelector((state: RootStateOrAny) => state?.auth);
    const [rssFeed, setRssFeed] = useState<RSSFeed[]>([{
        _source: {
            timestamp: "",
            'news.date': "",
            'news.source': "",
            'news.title': "",
            tags: {
                label: '',
                scheme: '',
                term: ''
            },
            author: "",
            'news.detail': "",
            reference: ""
        },
    }]);

    useEffect(() => {
        let isMounted = true;
        axios.get(`${feedUrl}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            try {
                setRssFeed(response.data.hits.hits)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        })
        .catch((error) => {
            Helper.handlerNetworkIncorrupt(error);
            setLoading(false);
            setNetworkInCorrupt(true);
        })
        return () => {
            isMounted = false;
            };
    }, [])

    const SecNewLoading = () => (
        <View style={{ margin: 20 }}>
            <ContentLoader
                active
                pRows={4}
                pHeight={[100, 30, 20]}
                pWidth={[100, 70, 100]}
            />
        </View>
    )
    
    const generateBadgeBackgroundColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    return `#${randomColor}`;
    };

    const renderChip = (item: RSSFeed) => {
        if (Array.isArray(item._source.tags) && item._source.tags.length > 0) {
            return item._source.tags.map((i: TagDetail, index: number) => 
                <Badge key={`item-${index}`} label={i.term}
                        onPress={() => console.log('pressed')}
                        labelStyle={{ fontSize: 10}}
                        size={20}
                        containerStyle={{ margin: 3 }} 
                        backgroundColor={generateBadgeBackgroundColor()} />
            )
        } else {
            return <Badge label={item._source.tags?.term}
                        onPress={() => console.log('pressed')}
                        labelStyle={{ fontSize: 10}}
                        size={20}
                        containerStyle={{ borderColor: "#c20a0a"}}
                        backgroundColor={generateBadgeBackgroundColor()} />
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Carousel
                    containerStyle={{
                        margin: 10,
                        height: 200,
                    }}
                    autoplay={autoplay}
                    loop
                    pageControlProps={{
                        size: 10,
                        containerStyle: styles.loopCarousel
                    }}
                    pageControlPosition={Carousel.pageControlPositions.OVER}
                >
                    {IMAGES.map((image, i) => {
                        return (
                            <Card flex centerV borderRadius={15} key={i}>
                                <Card.Image
                                    overlayType={Image.overlayTypes.BOTTOM}
                                    style={{ flex: 1 }}
                                    source={{
                                        uri: image
                                    }}
                                />
                            </Card>
                        );
                    })}
                </Carousel>
                <Text style={styles.containerTitle}>HPT Cyber Security</Text>
                <Text style={styles.containerText}>Services</Text>
                <View style={styles.containerContent}>
                    <View style={styles.containerBox}>
                        <View style={styles.containerBoxItem}>
                            {/* Soc */}
                            <View style={styles.containerItems}>
                                <TouchableOpacity onPress={() => navigation.navigate('SocStack')}>
                                    <View style={styles.containerItemSoc}>
                                     <Image source={require('../../images/soc_logo.png')} style={styles.ItemIconSoc}/>
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ color: '#b7b7b7' }}>SOC</Text>
                            </View>

                            {/* Mavex */}
                            <View style={styles.containerItems}>
                                <TouchableOpacity onPress={() => navigation.navigate('MavexStack')}>
                                    <View style={styles.containerItemMavex}>
                                        <Image source={require('../../images/mavex_logo.png')} style={styles.ItemIconMavex}/>
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ color: '#b7b7b7' }}>Mavex</Text>
                            </View>

                            {/* BugTrack */}
                            <View style={styles.containerItems}>
                                <TouchableOpacity onPress={() => navigation.navigate('BugTrackStack')} >
                                    <View style={styles.containerItemBugTrack}>
                                        <Image source={require('../../images/bugtrack_logo.png')} style={styles.ItemIconBugTrack}/>
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ color: '#b7b7b7' }}>BugTrack</Text>
                            </View>

                            {/* Source code */}
                            {/* <View style={styles.containerItems}>
                                <TouchableOpacity onPress={() => console.log("123")}>
                                    <View style={styles.containerItemSourceCode}>
                                        <MaterialIcons name="code" color="#959aa0" size={30} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ color: '#b7b7b7' }}>Source Code</Text>
                            </View> */}
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.containerTitle}>SecNews</Text>
                </View>
                <View>
                    {
                        isLoading
                            ?
                            <SecNewLoading />
                            :
                            isNetworkInCorrupt
                            ?
                            <NetworkIncorruptLoader />
                            :
                            rssFeed.map((item, i) => (
                                <Card key={`item_${i}`} style={{ margin: 10 }}>
                                    <View padding-20>
                                        <View style={styles.rssHeader}>
                                            <MaterialIcons name="rss-feed" size={30} color="#c20a0a" />
                                            <Text>{item._source['news.source']}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => Linking.openURL(item._source.reference)}>
                                            <Text text65 $textDefault>
                                                {item._source['news.title']}
                                            </Text>
                                        </TouchableOpacity>
                                        <Text text80 $textDefault>
                                            Author: {item._source.author}
                                        </Text>
                                        <View style={styles.rssFooter}>
                                            <Text>{renderChip(item)}</Text>
                                        </View>
                                    </View>
                                </Card>
                            ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const AppHomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="AppHomeScreen">
            <Stack.Screen name="Home" options={{ headerShown: false }}>
                {props => <BodyScreen {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default AppHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollView: {
        marginHorizontal: 20,
    },
    loopCarousel: {
        position: 'absolute',
        bottom: 15,
        left: 10
    },
    containerBox: {
        flexDirection: 'column',
    },
    containerBoxItem: {
        flex: 1,
        flexDirection: 'row',
    },
    containerContent: {
        textAlign: 'right',
        marginHorizontal: 20,
    },
    containerTitle: {
        paddingHorizontal: 30,
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
        marginVertical: 20
    },
    containerText: {
        paddingHorizontal: 30,
        fontSize: 18,
        marginBottom: 15,
    },
    containerItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerItemSoc: {
        width: 60,
        height: 60,
        // paddingVertical: 15,
        alignItems: 'center',
        // backgroundColor: '#faddca',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    ItemIconSoc: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    containerItemMavex: {
        width: 60,
        height: 60,
        // paddingVertical: 15,
        alignItems: 'center',
        // backgroundColor: '#f6c1c1',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
    },
    ItemIconMavex: {
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },
    containerItemBugTrack: {
        width: 60,
        height: 60,
        // paddingVertical: 15,
        alignItems: 'center',
        // backgroundColor: '#cde7ea',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    ItemIconBugTrack: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    containerItemSourceCode: {
        width: 60,
        height: 60,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#dde0e4',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
    },
    subTitle: {
        alignContent: 'center',
        textAlign: 'center',
        color: 'gray'
    },
    rssHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    rssFooter: {
        flexDirection: 'row',
        marginTop: 10
    },
})