import React, { useState, createRef, useEffect, useCallback } from 'react';
import {StyleSheet, Alert, TouchableOpacity, Platform} from 'react-native';
import {View, Text,Image, Badge, Modal, SectionsWheelPicker, Button, Incubator, ActionSheet, Card} from 'react-native-ui-lib';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
// import image
const avatar = require('../../../images/avatar.png');
const iconCamera = require('../../../images/icon-camera.png');

// import icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

// import content loader
import ContentLoader, { FacebookLoader, InstagramLoader, Bullets } from "react-native-easy-content-loader";

// import user storage
import userStorage from '../../../services/getUserAsyncStorage';

// Import Loader
import {NetworkIncorruptLoader} from '../../../components/NetworkIncorruptLoader';

// import ENV
import getEnvVars from '../../../../env';
const { apiUrl } = getEnvVars();

// Import helper
import { Helper } from '../../../helpers/index';
import axiosInstance from '../../../helpers/axios';

type Props = {
    navigation: any;
}

const Stack = createStackNavigator();


const BodyScreen:React.FC<Props> = ({navigation}) => {

    const [image, setImage] = useState<any | null>(null);
    const [isNetworkInCorrupt, setNetworkInCorrupt] = useState(false);
    const loadUserAvatar = userStorage.userAvatar().then(value => setImage(value));
    const auth = useSelector((state : RootStateOrAny) => state?.auth);

    let userName = auth?.userName || '';

    // Change Avatar - Pick Image from Photo Library
    const handlerPickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        if (!result.cancelled) {
            await AsyncStorage.setItem('userAvatar', result.uri);
            setImage(result.uri);
        }
    };

     // Loading ContentLoader
    const [isLoading, setLoading] = useState(true);

    const AccountLoading = () => (
        <View style={{margin: 20}}>
          <ContentLoader 
            active 
            avatar 
            pRows={4} 
            pHeight={[100, 30, 20]}
            pWidth={[100, 70, 100]}
          />
        </View>   
    )
    
    // Renewal Modal
    const [selectedDays, setSelectedDays] = useState(0);

    const days = Array.apply(null, Array(16)).map(function (x, i) {return '' + i})

    const getItems = useCallback((values: string[]) => {
        return values.map((item: string) => ({label: '' + item, value: item}))
    }, [])

    const onDaysChange = (item: number | string) => {
        setSelectedDays(item as number);
    }

    const onSavePress = () => {
        Alert.alert('Your chosen duration is: ' + 
            selectedDays + ' days')
    }

    const {WheelPicker} = Incubator;
    const sections: Incubator.WheelPickerProps[] = [
        {
            items: getItems(days),
            onChange: onDaysChange,
            initialValue: selectedDays,
            label: 'days',
            align: WheelPicker.alignments.CENTER,
            style: {flex: 1}
        }
    ]

    const [modalVisible, setModalVisible] = useState(false);
    const [fullName, setFullName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [expiredDay, setExpiredDay] = useState('');

    useEffect(() => {
        axiosInstance.get(`${apiUrl}/mobile/workspaces/account/me`)
        .then((response) => {
            try {
                if (response.data.status == 'Success') {
                    setFullName(response.data.nameAlias);
                    setCustomerEmail(response.data.customerEmail);
                    setExpiredDay(response.data.expiredDay);
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

    const [visible, setVisible] = useState(false) 
    return (
        <View style={styles.container}>
            <ActionSheet
                title={'Upload Photo'}
                message={'Choose Your Profile Picture'}
                cancelButtonIndex={3}
                destructiveButtonIndex={0}
                options={[
                    // {label: 'Open Camera', onPress: () => navigation.navigate('CameraScreen')},
                    {label: 'Choose From Library', onPress: handlerPickImage},
                    {label: 'Cancel', onPress: () => console.log('cancel')}
                ]}
                visible={visible}
                useNativeIOS
                onDismiss={() => setVisible(!visible)}
            />
            {
                isLoading
                ?
                <AccountLoading />
                :
                isNetworkInCorrupt
                ?
                <NetworkIncorruptLoader />
                :
                <View>
                    <Card style={styles.cardContainer}>
                        <TouchableOpacity style={styles.user}  onPress={() => setVisible(!visible)}>
                            <View>
                                <View style={styles.profileHeaderPicCircle}>
                                    {
                                        image
                                        ?
                                        <Image source={{ uri: image }} style={styles.imgAvatar} />
                                        :
                                        <Text style={styles.profileUserName}>
                                            {userName.charAt(0)}
                                        </Text>
                                    }
                                </View>
                                <Image source={iconCamera} style={styles.imgCamera}/>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.wrapper}>
                            <View style={styles.user_information_wrapper}>
                                <View style={styles.user_information_row}>
                                    <Text style={styles.user_information_label}>Full name: {fullName}</Text>
                                </View>
                                
                                <View style={styles.user_information_row}>
                                    <Text style={styles.user_information_label}>Plan: </Text>
                                    <Badge label={'basic'} size={20}/>
                                </View>

                                <View style={styles.user_information_row}>
                                    <Text style={styles.user_information_label}>This account registered to {customerEmail}</Text>
                                </View>
                                <View style={styles.user_information_row}>
                                    <Text style={styles.user_information_label}>Expired on </Text>
                                    <Text style={styles.user_info_text}>{expiredDay}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.features}>
                            {/* modal renewal */}
                            <View style={styles.centeredView}>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                        setModalVisible(!modalVisible);
                                    }}
                                    onBackgroundPress={() => setModalVisible(!modalVisible)}
                                    overlayBackgroundColor="rgba(0, 0, 0, 0.5)"
                                >
                                    <TouchableOpacity activeOpacity={1} onPress={() => setModalVisible(!modalVisible)} style={styles.centerBottomView} >
                                        <View
                                            onStartShouldSetResponder={(e) => true}
                                            onTouchEnd={(e) => e.stopPropagation()} 
                                            style={styles.modalView} >
                                            <Text style={styles.modelTitle}>Pick a duration</Text>
                                            <SectionsWheelPicker sections={sections} />
                                            <Button label={'Save'} style={styles.saveSWPBtn} backgroundColor="white" color="blue" onPress={onSavePress} />
                                            
                                        </View>
                                        <View style={styles.modalView}>
                                            <Button label={'Cancel'} style={styles.cancelSWPBtn} backgroundColor="white" color="black" onPress={() => setModalVisible(!modalVisible)} />
                                        </View>
                                    </TouchableOpacity>
                                </Modal>
                            </View>
                            {/* end */}
                            <TouchableOpacity style={styles.featureRenewal} onPress={() => setModalVisible(!modalVisible)} >
                                <MaterialIcons name="add-box" size={28} color="#5848FF" />
                                <Text style={styles.renewal_text}>Renewal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.featureChangePlan} onPress={() => console.log('work')}>
                                <MaterialIcons name="next-plan" size={28} color="#5848FF" />
                                <Text style={styles.change_plan_text}>Change Plan</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>  
            }
        </View>
    )
}

const AccountScreen:React.FC<Props> = ({ navigation }) => {
    return (
        <Stack.Navigator >    
            <Stack.Screen name="Account" options={{headerShown: false}}>
                {props => <BodyScreen {...props}/>}
            </Stack.Screen>

        </Stack.Navigator>
    )
}
export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    cardContainer: {
        margin: 10
    },
    user:{
        marginTop: 20,
        marginLeft: 20,
        borderRadius:10,
    },
    wrapper: {
        width: '100%',
        marginLeft: 20,
    },
    user_information_wrapper: {
        marginTop: 20,
    },
    user_information_row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    user_information_label: {
        fontSize: 17,
    },
    user_info_text: {
        fontSize: 17,
    },
    features: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        margin: 20
    },
    featureRenewal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    featureChangePlan: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    renewal_text: {
        fontSize: 17,
        color: '#5848FF',
        marginLeft: 5,
        marginRight: 10,
    },
    change_plan_text: {
        fontSize: 17,
        color: '#5848FF',
        marginLeft: 5,
        marginRight: 20,
    },
    imgAvatar:{
        borderRadius:100,
        height:100,
        width: 100,
    },
    imgCamera: {
        borderRadius: 100,
        height: 25,
        width: 25,
        position: 'absolute',
        bottom: 0,
        left: 70,
        backgroundColor:'#fff'
    }, 
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    centerBottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'yellow'
    },
    modalView: {
        backgroundColor: "white",
        width: '95%',
        borderRadius: 16,
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        marginBottom: 10,
        alignItems: 'center'
    },
    modelTitle: { 
        fontSize: 18,
        margin: 4,
        padding: 8,
    },
    buttonsWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 4
    },
    saveSWPBtn: {
        width: '105%',
        marginTop: 8,
    },
    cancelSWPBtn: {
        width: '105%',
    },
    profileHeaderPicCircle: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        color: '#fff',
        backgroundColor: '#c20a0a',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileUserName: {
        fontSize: 25,
        color: '#fff'
    }
})