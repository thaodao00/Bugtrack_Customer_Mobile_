import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, ScrollView, TextInput, Dimensions} from 'react-native';
import {View, Text, Card, Image} from 'react-native-ui-lib';
import ContentLoader from "react-native-easy-content-loader";

// Import Icon
import {MaterialIcons, Entypo, Ionicons, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Import helper
import { Helper } from '../../../helpers/index';
import axiosInstance from '../../../helpers/axios';

// Import Loader
import {NetworkIncorruptLoader} from '../../../components/NetworkIncorruptLoader';

// import user storage
import userStorage from '../../../services/getUserAsyncStorage';

// import Redux
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

// Import getEnvVars() from env
import getEnvVars from '../../../../env';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { apiUrl } = getEnvVars();

type Props = {
    navigation: any;
    route: any;
    appId: any;
    bugId: any;
}

interface IDataSource {
    appId: number;
    bugId: number;
    ownerId: number;
    testNameId: number;
    hStatus: string;
    cStatus: string;
    function: string;
    url: string;
    param: string;
    condition: string;
    viDescription: string;
    viRecommend: string;
    enDescription: string;
    enRecommend: string;
    comment: any;
    cvssSeverity: string;
    cvssString: string;
    cvssScore: string;
    updateAt: string;
    updateById: number;
    serviceId: string;
    testName: string;
    categoryName: string;
    owner: string;
    updateBy: string;
    severityColor: string;
    hStatusColor: string;
    cStatusColor: string;
}

const initDataSource: IDataSource = {
    appId: 0,
    bugId: 0,
    ownerId: 0,
    testNameId: 0,
    hStatus: "",
    cStatus: "",
    function: "",
    url: "",
    param: "",
    condition: "",
    viDescription: "",
    viRecommend: "",
    enDescription: "",
    enRecommend: "",
    comment: [],
    cvssSeverity: "",
    cvssString: "",
    cvssScore: "",
    updateAt: "",
    updateById: 0,
    serviceId: "",
    testName: "",
    categoryName: "",
    owner: "",
    updateBy: "",
    severityColor: "",
    hStatusColor: "",
    cStatusColor: "",
}

const BodyScreen:React.FC<Props> = ({navigation, route}) => {
    const {appId, bugId} = route.params;
    const [avatar, setAvatar] = useState<any | null>(null);
    const loadUserAvatar = userStorage.userAvatar().then(value => setAvatar(value));
    const auth = useSelector((state : RootStateOrAny) => state?.auth);
    const [isLoading, setLoading] = useState(true);
    const [isNetworkInCorrupt, setNetworkInCorrupt] = useState(false);
    const inputRef = useRef();
    const [inputComment, setInputComment] = useState("");
    const [isPostingComment, setPostingComment] = useState(false);
    const [isUpdating, setUpdating] = useState(false);
    const [masterDataSource, setMasterDataSource] = useState<IDataSource[]>([]);
    const [addonDataSource, setAddonDataSource] = useState<[{
        id: number;
        serviceId: string;
        testName: string;
        categoryName: string;
        owner: string;
        updateBy: string;
        severityColor: string;
        hStatusColor: string;
        cStatusColor: string;
      }]>([{
        id: 0,
        serviceId: "",
        testName: "",
        categoryName: "",
        owner: "",
        updateBy: "",
        severityColor: "",
        hStatusColor: "",
        cStatusColor: "",
      }]);
    
    let userName = auth?.userName || '';

    //map data to masterDataSource
    if(masterDataSource && masterDataSource.length > 0) {
        masterDataSource.map(bug => {
                const serviceId = addonDataSource.find(serviceId => serviceId.id === bug.bugId)
                const testName = addonDataSource.find(testName => testName.id === bug.bugId)
                const categoryName = addonDataSource.find(categoryName => categoryName.id === bug.bugId)
                const owner = addonDataSource.find(owner => owner.id === bug.bugId)
                const updateBy = addonDataSource.find(updateBy => updateBy.id === bug.bugId)
                const severityColor = addonDataSource.find(severityColor => severityColor.id === bug.bugId)
                const hStatusColor = addonDataSource.find(hStatusColor => hStatusColor.id === bug.bugId)
                const cStatusColor = addonDataSource.find(cStatusColor => cStatusColor.id === bug.bugId)

                bug.serviceId = serviceId ? serviceId.serviceId : "";
                bug.testName = testName ? testName.testName : "";
                bug.categoryName = categoryName ? categoryName.categoryName : "";
                bug.owner = owner ? owner.owner : "";
                bug.updateBy = updateBy ? updateBy.updateBy : "";
                bug.severityColor = severityColor ? severityColor.severityColor : "";
                bug.hStatusColor = hStatusColor ? hStatusColor.hStatusColor : "";
                bug.cStatusColor = cStatusColor ? cStatusColor.cStatusColor : "";
            return bug
        });
    }

    useEffect(() => {
        console.log("call here");
        axiosInstance.post(`${apiUrl}/mobile/workspaces/app/bug`, {"appId": appId, "bugId": bugId})
        .then((response) => {
            try {
                if (response.data.status == 'Success') {
                    console.log("get bugs");
                    setPostingComment(false);
                    setMasterDataSource(response.data.data.bugs);
                    setAddonDataSource(response.data.data.infoByBug);
                    setUpdating(false);
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
    }, [isUpdating]);

    const BugLoading = () => (
        <View>
            <Card borderRadius={0} style={{marginBottom: 5}}>
                <View padding-10>
                    <ContentLoader
                        title={false}
                        pRows={11}
                        pHeight={[30, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]}
                        pWidth={[30, 300, 350, 300, 350, 300, 350, 300, 350, 200, 250]}
                    />
                </View>
            </Card>
            <Card borderRadius={0} style={{marginBottom: 5}}>
                <View padding-10>
                    <ContentLoader
                        title={false}
                        pRows={3}
                        pHeight={[30, 20, 20]}
                        pWidth={[30, 200, 250]}
                    />
                </View>
            </Card>
            <Card borderRadius={0} style={{marginBottom: 5}}>
                <View padding-10>
                    <ContentLoader
                        title={false}
                        pRows={5}
                        pHeight={[30, 20, 20, 20, 20]}
                        pWidth={[30, 100, 150, 100, 150]}
                    />
                </View>
            </Card>
        </View>
    )
    
    const RenderComment = () => {
        let comment: any[] = [];
        if (masterDataSource && masterDataSource.length > 0) {
            const comments =  masterDataSource.map(item => JSON.parse(item?.['comment']));
            if(comments[0] === null) {
                comment = [];
            } else {
                const a = comments[0];
                comment = a['comment'];
            }
        }
        return <View>
            {
            comment.map((item, i) =>(
                <View key={`item_${i}`}>
                    <TouchableOpacity>
                        <Text text70 style={styles.items}>{item?.username} : {item?.comment}</Text>
                        <Text $textDisabled>{item?.updated_at}-{item?.status}</Text>
                    </TouchableOpacity>
                </View>

            ))
            }
        </View>
    }

    const NewComment = () => (
        <View style={{marginTop: 5, marginLeft: -10}}>
            <ContentLoader
                title={false}
                pRows={2}
                pHeight={[25, 15]}
                pWidth={[270, 220]}
            />
        </View>
    )
    
    const handlerPostComment = () => {
        console.log("post cmt");
        setPostingComment(true);
        axiosInstance.post(`${apiUrl}/mobile/workspaces/app/bug/comment`, {"appId": appId, "bugId": bugId, comment: inputComment})
        .then((response) => {
            try {
                if (response.data.status == 'Success') {
                    inputRef.current.clear();
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
        setUpdating(true);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            {
                isLoading
                ?
                <BugLoading />
                :
                masterDataSource && masterDataSource.length > 0 && masterDataSource.map((item, i) => (
                    <View key={`item_${i}`}>
                        <Card borderRadius={0} style={{marginBottom: 5}}>
                            <View padding-10>
                                <View style={styles.bugHeader}>
                                    <View style={styles.bugSubHeader}>
                                    <Entypo name="bug" size={30} color="#c20a0a" />
                                    </View>
                                    <MaterialIcons name="more-vert" size={24} color="#c20a0a" onPress={() => console.log('123')}/>
                                </View>
                                <View>
                                    <Text text70 style={styles.items}>{item?.['serviceId']}</Text>
                                    <Text text70 style={styles.items}>BugId: {item?.['serviceId']+'#'+item?.['bugId']}</Text>
                                </View>
                                <View>
                                    <Text text70 style={styles.items}>TestCase: {item?.['testName']}</Text>
                                    <Text text70 style={styles.items}>Category: {item?.['categoryName']}</Text>
                                    <Text text70 style={styles.items}>Severity: <Text color={item?.['severityColor']}>{item?.['cvssSeverity']}</Text> Score: <Text color={item?.['severityColor']}>{item?.['cvssScore']}</Text></Text>
                                    <Text text70 style={styles.items}>CVSS String: {item?.['cvssString']}</Text>
                                    <Text text70 style={styles.items}>Owner: {item?.['owner']}</Text>
                                </View>
                            </View>
                        </Card>
                        <Card borderRadius={0} style={{marginBottom: 5}}>
                            <View padding-10>
                                <View style={styles.bugHeader}>
                                    <View style={styles.bugSubHeader}>
                                    <Ionicons name="checkmark-done" size={30} color="#c20a0a" />
                                    </View>
                                    <MaterialIcons name="more-vert" size={24} color="#c20a0a" onPress={() => console.log('123')}/>
                                </View>
                                <Text text70 style={styles.items}>HTP Status: <Text color={item?.['hStatusColor']}>{item?.['hStatus']}</Text></Text>
                                <Text text70 style={styles.items}>Customer Status: <Text color={item?.['cStatusColor']}>{item?.['cStatus']}</Text></Text>
                            </View>
                        </Card>
                        <Card borderRadius={0} style={{marginBottom: 5}}>
                            <View padding-10>
                                <View style={styles.bugHeader}>
                                    <View style={styles.bugSubHeader}>
                                    <MaterialCommunityIcons name="vector-line" size={30} color="#c20a0a" />
                                    </View>
                                    {/* <MaterialIcons name="more-vert" size={24} color="#c20a0a" onPress={() => console.log('123')}/> */}
                                </View>
                                <Text text70 style={styles.items}>Url: {item?.['url']}</Text>
                                <Text text70 style={styles.items}>Function: {item?.['function']}</Text>
                                <Text text70 style={styles.items}>Param: {item?.['param']}</Text>
                                <Text text70 style={styles.items}>Condition: {item?.['condition']}</Text>
                            </View>
                        </Card>
                        <Card borderRadius={0} style={{marginBottom: 5}}>
                            <View padding-10>
                                <View style={styles.bugHeader}>
                                    <View style={styles.bugSubHeader}>
                                    <MaterialIcons name="recommend" size={30} color="#c20a0a" />
                                    </View>
                                    {/* <MaterialIcons name="more-vert" size={24} color="#c20a0a" onPress={() => console.log('123')}/> */}
                                </View>
                                <Text text70 style={styles.items}>VI-Description: {item?.['viDescription']}</Text>
                                <Text text70 style={styles.items}>VI-Recommend: {item?.['viRecommend']}</Text>
                            </View>
                        </Card>
                        <Card borderRadius={0} style={{marginBottom: 5}}>
                            <View padding-10>
                                <View style={styles.bugHeader}>
                                    <View style={styles.bugSubHeader}>
                                    <MaterialIcons name="recommend" size={30} color="#c20a0a" />
                                    </View>
                                    {/* <MaterialIcons name="more-vert" size={24} color="#c20a0a" onPress={() => console.log('123')}/> */}
                                </View>
                                <Text text70 style={styles.items}>EN-Description: {item?.['enDescription']}</Text>
                                <Text text70 style={styles.items}>EN-Recommend: {item?.['enRecommend']}</Text>
                            </View>
                        </Card>
                        <Card borderRadius={0} style={{marginBottom: 5}}>
                            <View padding-10>
                                <View style={styles.bugHeader}>
                                    <View style={styles.bugSubHeader}>
                                    <FontAwesome name="commenting-o" size={30} color="#c20a0a" />
                                    </View>
                                    {/* <MaterialIcons name="more-vert" size={24} color="#c20a0a" onPress={() => console.log('123')}/> */}
                                </View>
                                <RenderComment />
                                {
                                    isPostingComment
                                    ?
                                    <NewComment />
                                    :
                                    <View />
                                }
                            </View>
                        </Card>
                        <Card borderRadius={0}>
                            <View padding-10>
                                <View style={styles.bugHeader}>
                                    <View style={styles.bugSubHeader}>
                                        {
                                            avatar
                                            ?
                                            <Image source={{ uri: avatar }} style={styles.imgAvatar} />                                            
                                            :
                                            <View style={styles.profileHeaderPicCircle}>
                                                <Text style={styles.profileUserName}>
                                                    {userName.charAt(0)}
                                                </Text>
                                            </View>
                                        }
                                    </View>
                                    {/* <MaterialIcons name="more-vert" size={24} color="#c20a0a" onPress={() => console.log('123')}/> */}
                                </View>
                                <View style={styles.commentContainer}>
                                    <View style={styles.inputComment}>
                                        <TextInput
                                            ref={inputRef}
                                            placeholder="Write a comment..."
                                            onChangeText={(cmt)=>{setInputComment(cmt)}}
                                        />
                                    </View>
                                    <TouchableOpacity onPress={handlerPostComment}>
                                        <MaterialCommunityIcons name="send-circle" size={40} color="#c20a0a" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    </View>
                ))
            }
            </ScrollView>
        </View>
    )
}

const BugScreen:React.FC<Props> = ({ navigation, route }) => {
    const {appId, bugId} = route.params;
    return (
        <Stack.Navigator>
            <Stack.Screen  name="Bug" options={{headerShown: false,}} initialParams={{appId, bugId}}>
                {props => <BodyScreen {...props} appId={appId} bugId={bugId}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default BugScreen;

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bugHeader: {
        flexDirection:"row",
        justifyContent:'space-between',
        marginBottom: 5
    },
    bugSubHeader: {
        flexDirection:"row",
    },
    items: {
        marginBottom: 5,
    },
    commentContainer: {
        flexDirection:"row",
        justifyContent:'space-between',
    },
    inputComment: {
        borderRadius: 40,
        padding: 10,
        borderColor: '#c20a0a',
        borderWidth: 1,
        width: windowWidth - 60
    },
    commentInput: {
        color: "#6e6e6e",
    },
    imgAvatar:{
        borderRadius: 30 / 2,
        height:30,
        width: 30,
    },
    profileHeaderPicCircle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        color: '#fff',
        backgroundColor: '#c20a0a',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileUserName: {
        fontSize: 14,
        color: '#fff'
      },
})