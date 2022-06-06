import axios from 'axios';
import React, { useEffect, useState, createRef } from 'react';
import {StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {View, Text, Image, Button, Colors, Card, Hint, TouchableOpacity, ActionSheet} from 'react-native-ui-lib';
import ContentLoader from "react-native-easy-content-loader";

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<{
    NotificationScreen: undefined;
    Notification: any;
}>();

// Import Icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Import Redux
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

// Import getEnvVars() from env
import getEnvVars from '../../../env';
const { apiUrl, imageUrl } = getEnvVars();

// Import helper
import { Helper } from '../../helpers/index';
import axiosInstance from '../../helpers/axios';

// Import Loader
import {NetworkIncorruptLoader} from '../../components/NetworkIncorruptLoader';

type Props = {
    navigation: any;
}

const NotificationScreen:React.FC<Props> = ({navigation, ...props}) => {
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState<[{
        id: string;
        read_at: string;
        created_at: string;
        contentByNotification: [];
    }]>([{
        id: "",
        read_at: "",
        created_at: "",
        contentByNotification: [],
    }]);

    const [contentNotifications, setContentNotifications] = useState<[{
        id: string;
        contentByNotification: [];
    }]>([{
        id: "",
        contentByNotification: [],
    }]);

    const [isLoading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);
    const [notificationID, setNotificationID] = useState(null);
    const [isNetworkInCorrupt, setNetworkInCorrupt] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    if (notifications && notifications.length > 0) {
        notifications.map(notification => {
            const itemContent = contentNotifications.find(contentNotification => contentNotification.id === notification.id);
            notification.contentByNotification = itemContent ? itemContent?.contentByNotification : [];
            return notification;
        })
    }

    useEffect(() => {
        axiosInstance.get(`${apiUrl}/mobile/workspaces/notifications`)
        .then((response) => {
            try {
                if (response.data.status == 'Success') {
                    setNotifications(response.data.data.notifications);
                    setContentNotifications(response.data.data.content);
                    setLoading(false);
                } else {
                    Helper.handlerTokenExpire(navigation);
                }
            } catch (error) {
                Helper.handlerException(navigation, error);
            }
        })
        .catch((error) => {
            setLoading(false);
            setNetworkInCorrupt(true);
        })
    }, [])

    const NotificationLoading = () => (
        <View>
            <Card style={{margin: 5}}>
                <View padding-20>
                    <ContentLoader
                        pRows={3}
                        pHeight={[40, 25, 25]}
                        pWidth={[250, 350, 350]}
                    />
                </View>
            </Card>
            <Card style={{margin: 5}}>
                <View padding-20>
                    <ContentLoader
                        pRows={3}
                        pHeight={[40, 25, 25]}
                        pWidth={[250, 350, 350]}
                    />
                </View>
            </Card>
            <Card style={{margin: 5}}>
                <View padding-20>
                    <ContentLoader
                        pRows={3}
                        pHeight={[40, 25, 25]}
                        pWidth={[250, 350, 350]}
                    />
                </View>
            </Card>
            <Card style={{margin: 5}}>
                <View padding-20>
                    <ContentLoader
                        pRows={3}
                        pHeight={[40, 25, 25]}
                        pWidth={[250, 350, 350]}
                    />
                </View>
            </Card>
        </View>
    )
    
    const NotificationBug = ({
        id,
        isRead,
        title,
        subtitle,
        avatar,
        serviceId,
        projectId,
        group,
        bugId,
    }:{
        id: string,
        isRead: number,
        title: string,
        subtitle: string,
        avatar: string,
        serviceId: string,
        projectId: number,
        group: string,
        bugId: number,
    }) => (
        <Card style={{margin: 5,}}>
            <View padding-20>
                <View style={styles.notificationHeader}>
                    <Image
                        style={{width: 30, height: 30}}
                        source={{uri: imageUrl + "/" + avatar}}
                    />
                    <MaterialIcons name="more-vert" size={24} color="#c20a0a" onPress={() => handlerNotificationOption(id)}/>             
                </View>
                <TouchableOpacity
                    onPress={() => {
                        console.log("touch notification");
                    }}
                >
                    <View style={{opacity: isRead}}>
                        <Text text60 $textDefault>
                            {title}
                        </Text>
                        <Text text80 $textDefault>
                            {subtitle}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Card>
    )

    const NotificationProject = ({
        id,
        isRead,
        title,
        subtitle,
        projectId,
        projectName,
        group,
    }:{
        id: string,
        isRead: number,
        title: string,
        subtitle: string,
        projectId: number,
        projectName: string,
        group: string,
    }) => (
        <Card style={{margin: 5}}>
            <View padding-20>
                <View style={styles.notificationHeader}>
                    <MaterialIcons name="folder" size={30} color="#c20a0a" />
                    <MaterialIcons name="more-vert" size={24} color="#c20a0a" onPress={() => handlerNotificationOption(id)}/>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        console.log("touch notification");
                    }}
                >
                    <View style={{opacity: isRead}}>
                        <Text text60 $textDefault>
                            {title}
                        </Text>
                        <Text text80 $textDefault>
                            {subtitle}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Card>
    )
    
    const NotificationLogin = ({
        id,
        isRead,
        title,
        subtitle,
        email,
        username,
        clientIp,
        userAgent,
        country,
        countryCode,
        region,
        regionName,
        city,
        timezone,
        isp,
        asn,
        created_at
      }: {
        id: string,
        isRead: number,
        title: string,
        subtitle: string,
        email: string,
        username: string,
        clientIp: string,
        userAgent: string,
        country: string,
        countryCode: string,
        region: string,
        regionName: string,
        city: string,
        timezone: string,
        isp: string,
        asn: string,
        created_at: string
      }) => (
        <Card style={{margin: 5}}>
            <View padding-20>
                <View style={styles.notificationHeader}>
                    <MaterialIcons name="security" size={30} color="#c20a0a" />
                    <MaterialIcons name="more-vert" size={24} color="#c20a0a" onPress={() => handlerNotificationOption(id)}/>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ReviewLoginScreen',{
                            subtitle: subtitle,
                            email: email,
                            username: username,
                            clientIp: clientIp,
                            userAgent: userAgent,
                            country: country,
                            countryCode: countryCode,
                            region: region,
                            regionName: regionName,
                            city: city,
                            timezone: timezone,
                            isp: isp,
                            asn: asn,
                            created_at: created_at
                          });
                    }}
                >
                    <View style={{opacity: isRead}}>
                        <Text text60 $textDefault>
                            {title}
                        </Text>
                        <Text text80 $textDefault>
                            {subtitle}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Card>
      )
    
    const handlerNotificationOption = (id : any) => {
        setVisible(!visible);
        setNotificationID(id);
    }

    const handlerNotificationMakeAsRead = (id : any) => {
        axiosInstance.post(`${apiUrl}/mobile/workspaces/notification/make-as-read`, {notificationId: id})
        .then((response) => {
            try {
                if (response.data.status == 'Success') {
                    handlerRefresh();
                } else {
                    Helper.handlerTokenExpire(navigation);
                }
            } catch (error) {
                Helper.handlerException(navigation, error);
            }
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
            setNetworkInCorrupt(true);
        })
    }

    const handlerNotificationRemove = (id : any) => {
        //
    }

    const handlerRefresh = () => {
    setLoading(true);
    setNetworkInCorrupt(false);
        axiosInstance.get(`${apiUrl}/mobile/workspaces/notifications`)
        .then((response) => {
            try {
                if (response.data.status == 'Success') {
                    setNotifications(response.data.data.notifications);
                    setContentNotifications(response.data.data.content);
                    setLoading(false);
                } else {
                    Helper.handlerTokenExpire(navigation);
                }
            } catch (error) {
                Helper.handlerException(navigation, error);
            }
        })
        .catch((error) => {
            setLoading(false);
            setNetworkInCorrupt(true);
        })
    }
    return (
        <View style={styles.container}>
            <ActionSheet
                title={notificationID ? notificationID : ''}
                message={'Choose Your Option'}
                cancelButtonIndex={3}
                destructiveButtonIndex={0}
                options={[
                    {label: 'Make as read notification', onPress: () => handlerNotificationMakeAsRead(notificationID)},
                    {label: 'Remove this notification', onPress: () => handlerNotificationRemove(notificationID)},
                    {label: 'Cancel'}
                ]}
                visible={visible}
                useNativeIOS
                onDismiss={() => setVisible(!visible)}
            />
            <ScrollView refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={handlerRefresh}
                />
            }>
                {
                    isLoading
                    ?
                    <NotificationLoading />
                    :
                    isNetworkInCorrupt 
                    ?
                    <NetworkIncorruptLoader />
                    :
                    notifications && notifications.length > 0
                    ?
                    notifications.map((item, i) => (
                        <View key={`item_${item.id}`}>
                            {
                                item.contentByNotification.map((content, c) => {
                                    switch (content['tag']) {
                                        case "bug":
                                            return <NotificationBug key={`content_${c}`} id={item.id} isRead={item.read_at?0.5:1} title={content["title"]} subtitle={content["subtitle"]} avatar={content["avatar"]} serviceId={content["serviceId"]} projectId={content["projectId"]} group={content["group"]} bugId={content["bugId"]}></NotificationBug>;

                                        case "project":
                                            return <NotificationProject key={`content_${c}`} id={item.id} isRead={item.read_at?0.5:1} title={content["title"]} subtitle={content["subtitle"]} projectId={content["projectId"]} projectName={content["projectName"]} group={content["group"]}></NotificationProject>;
                                        case "login":
                                            return <NotificationLogin key={`content_${c}`} id={item.id} isRead={item.read_at?0.5:1} title={content['title']} subtitle={content['subtitle']} email={content['email']} username={content['username']} clientIp={content['clientIp']} userAgent={content['userAgent']} country={content['country']} countryCode={content['countryCode']} region={content['region']} regionName={content['regionName']} city={content['city']} timezone={content['timezone']} isp={content['isp']} asn={content['asn']} created_at={item.created_at}></NotificationLogin>
                                        default:
                                            break;
                                    }
                                })
                            }
                        </View>
                    ))
                    :
                    <Text>asdh</Text>
                }
            </ScrollView>
        </View>
    )
}

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    notificationHeader:{
        flex: 1,
        flexDirection:"row",
        justifyContent:'space-between',
        marginBottom: 5
    },
})