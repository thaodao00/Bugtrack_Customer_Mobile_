import React, { useState, useEffect, useMemo } from 'react';
import {StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import {Assets, View, Text, TabController, Colors, Button, TabControllerItemProps, Card, Carousel, Spacings} from 'react-native-ui-lib';
import { createStackNavigator } from '@react-navigation/stack';
import ContentLoader from "react-native-easy-content-loader";

import _ from 'lodash';

const Stack = createStackNavigator();

// Import getEnvVars() from env
import getEnvVars from '../../../../env';
const { apiUrl } = getEnvVars();

// Import helper
import { Helper } from '../../../helpers/index';
import axiosInstance from '../../../helpers/axios';

// Import Loader
import {NetworkIncorruptLoader} from '../../../components/NetworkIncorruptLoader';

type Props = {
    navigation: any;
    route: any;
}

const TABS = ['Web', 'Mobile', 'API', 'Source Code Audit'];

const BodyScreen:React.FC<Props> = ({ route, navigation}) => {
    const [asCarousel, setAsCarousel] = useState(true);
    const [fewItems, setFewItems] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isNetworkInCorrupt, setNetworkInCorrupt] = useState(false);
    const [key, setKey] = useState();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [centerSelected, setCenterSelected] = useState(false);

    const [masterDataSource, setMasterDataSource] = useState<[{
        appId: number;
        appName: string;
        Method: string;
        standardId: number;
        fromDate: string;
        toDate: string;
        serviceId: string;
        platformName: string;
        standardName: string;
        bug: string;
        fixedBug: string;
        bugCritical: string;
        bugHigh: string;
        bugMedium: string;
        bugLow: string;
      }]>([{
        appId: 0,
        appName: "",
        Method: "",
        standardId: 0,
        fromDate: "",
        toDate: "",
        serviceId: "",
        platformName: "",
        standardName: "",
        bug: "",
        fixedBug: "",
        bugCritical: "",
        bugHigh: "",
        bugMedium: "",
        bugLow: ""
      }]);
    
    const [addonDataSource, setAddonDataSource] = useState<[{
        id: number;
        serviceId: string;
        platformName: string;
        standardName: string;
        bug: string;
        fixedBug: string;
        bugCritical: string;
        bugHigh: string;
        bugMedium: string;
        bugLow: string;
      }]>([{
        id: 0,
        serviceId: "",
        platformName: "",
        standardName: "",
        bug: "",
        fixedBug: "",
        bugCritical: "",
        bugHigh: "",
        bugMedium: "",
        bugLow: ""
      }]);
      
    //map data to masterDataSource
    const mappingData = useMemo(() => {
        if(masterDataSource && masterDataSource.length > 0 && addonDataSource) {
            return masterDataSource.map(app => {
                    const serviceId = addonDataSource.find(serviceId => serviceId.id === app.appId)
                    const platformName = addonDataSource.find(platformName => platformName.id === app.appId)
                    const standardName = addonDataSource.find(standardName => standardName.id === app.appId)
                    const bug = addonDataSource.find(bug => bug.id === app.appId)
                    const fixedBug = addonDataSource.find(fixedBug => fixedBug.id === app.appId)
                    const bugCritical = addonDataSource.find(bugCritical => bugCritical.id === app.appId)
                    const bugHigh = addonDataSource.find(bugHigh => bugHigh.id === app.appId)
                    const bugMedium = addonDataSource.find(bugMedium => bugMedium.id === app.appId)
                    const bugLow = addonDataSource.find(bugLow => bugLow.id === app.appId)

                    app.serviceId = serviceId ? serviceId.serviceId : "";
                    app.platformName = platformName ? platformName.platformName : "";
                    app.standardName = standardName ? standardName.standardName : "";
                    app.bug = bug ? bug.bug : "";
                    app.fixedBug = fixedBug ? fixedBug.fixedBug : "";
                    app.bugCritical = bugCritical ? bugCritical.bugCritical : "";
                    app.bugHigh = bugHigh ? bugHigh.bugHigh : "";
                    app.bugMedium = bugMedium ? bugMedium.bugMedium : "";
                    app.bugLow = bugLow ? bugLow.bugLow : "";

                return app
            });
        }

        return {}
    }, [addonDataSource])

    useEffect(() => {
        axiosInstance.post(`${apiUrl}/mobile/workspaces`, {"workspace": TABS[route.params.initialIndex]})
        .then((response) => {
            try {
                if (response.data.status == 'Success') {
                    setMasterDataSource(response.data.data.projects);
                    setAddonDataSource(response.data.data.infoByProject);
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

    const renderCardContent = () => {
      return (
        <View>
            {masterDataSource && masterDataSource.length > 0 ? masterDataSource.map((item, i) => (
                <Card key={`item_${i}`} flex style={{margin: 5}} onPress ={()=> navigation.navigate('AppScreen',{appName: item['appName'], platform: item['platformName'], appId: item['appId']})} >
                    <Card.Section bg-$backgroundDangerHeavy padding-4 />
                    <View padding-16>
                        <View paddingB-16>
                            <Text text70>{item['serviceId']}</Text>
                        </View>
                        <Text text60>{item['appName']}</Text>
                        <Text text80>Method: {item['Method']}</Text>
                        <Text text80>Checklist: {item['standardName']}</Text>
                        <Text text80>From
                            <Text text80 inherit $textPrimary> {item['fromDate']} </Text>
                            to
                            <Text text80 inherit $textPrimary> {item['toDate']} </Text>
                        </Text>
                        <Text text80>
                            Total bugs: <Text text80 inherit $textPrimary> {item['bug']} </Text>
                            Fixed : <Text text80 inherit $textSuccess> {item['fixedBug']} </Text>
                        </Text>
                        <Text text80>Critical:
                            <Text text80 color='#d942f4'> {item['bugCritical']} </Text>
                            High:
                            <Text text80 color='#e55353'> {item['bugHigh']} </Text>
                            Medium:
                            <Text text80 color='#ffae00'> {item['bugMedium']} </Text>
                            Low:
                            <Text text80 color='#ffd940'> {item['bugLow']} </Text>
                        </Text>
                    </View>
                </Card>
            ))
            :
            <Card flex style={{margin: 5 }} >
                <Card.Section bg-$backgroundDangerHeavy padding-4 />
                <View padding-16>
                    <Text>You don't have any workspace for this.</Text>
                    <Text>- Contact us if you think it's wrong.</Text>
                </View>
            </Card>
        }
        </View>
      )
    }

    const handlerRequestAPI = (workspace : any) => {
        setLoading(true);
        setNetworkInCorrupt(false);
        axiosInstance.post(`${apiUrl}/mobile/workspaces`, {"workspace": workspace})
        .then((response) => {
            try {
                if (response.data.status == 'Success') {
                    setMasterDataSource(response.data.data.projects);
                    setAddonDataSource(response.data.data.infoByProject);
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
    const handlerOnChangeIndex = (selectedIndex: number) => {
        setSelectedIndex(selectedIndex);
        handlerRequestAPI(TABS[selectedIndex]);
    }
    const items: TabControllerItemProps[] = _.flow(tabs => _.take(tabs, fewItems ? 3 : TABS.length),
      (tabs: TabControllerItemProps[]) =>
        _.map<TabControllerItemProps>(tabs, (tab: TabControllerItemProps, index: number) => ({
          label: tab,
          key: tab,
        })))(TABS);

    const renderTabPages = () => {
        const Container = asCarousel ? TabController.PageCarousel : View;
        const containerProps = asCarousel ? {} : {flex: true};
        return (
            <Container {...containerProps}>
                {/* Web */}
                <TabController.TabPage index={0}>
                    <ScrollView style={{ padding: 5 }}>
                        {renderCardContent()}
                    </ScrollView>
                </TabController.TabPage>
                {/* Mobile */}
                <TabController.TabPage index={1}>
                    <ScrollView style={{ padding: 5 }}>
                        {renderCardContent()}
                    </ScrollView>
                </TabController.TabPage>
                {/* API */}
                <TabController.TabPage index={2}>
                    <ScrollView style={{ padding: 5 }}>
                        {renderCardContent()}
                    </ScrollView>
                </TabController.TabPage>
                {/* Source Code Audit */}
                <TabController.TabPage index={3}>
                    <ScrollView style={{ padding: 5 }}>
                        {renderCardContent()}
                    </ScrollView>
                </TabController.TabPage>
            </Container>
        );
    }

    const ProjectLoading = () => (
        <View>
            <Card flex style={{margin: 5 }} >
                <Card.Section bg-$backgroundDangerHeavy padding-4 />
                <View padding-16>
                    <ContentLoader
                        pRows={3}
                        pHeight={[40, 25, 25]}
                        pWidth={[250, 350, 350]}
                    />
                </View>
            </Card>
        </View>
    )

    return (
        <View flex bg-$backgroundDefault>
            <TabController
                key={key}
                asCarousel={asCarousel}
                // selectedIndex={selectedIndex}
                initialIndex={route.params.initialIndex}
                onChangeIndex={handlerOnChangeIndex}
                items={items}>
                <TabController.TabBar
                    items={items}
                    key={key}
                    // uppercase
                    indicatorStyle={styles.indicatorStyle}
                    indicatorInsets={0}
                    spreadItems={!fewItems}
                    backgroundColor={fewItems ? 'transparent' : undefined}
                    labelStyle={styles.labelStyle}
                    selectedLabelStyle={styles.selectedLabelStyle}
                    iconColor={'green'}
                    enableShadow
                    activeBackgroundColor={Colors.blue60}
                    centerSelected={centerSelected}
                    selectedLabelColor='#c20a0a'>
                </TabController.TabBar>
                {
                    isLoading
                    ?
                    <ProjectLoading />
                    :
                    isNetworkInCorrupt
                    ?
                    <NetworkIncorruptLoader />
                    :
                    renderTabPages()
                }
            </TabController>
      </View>
    )
}

const WorkspaceScreen:React.FC<Props> = ({ navigation, route }) => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Workspace" options={{headerShown: false}}>
                {props => <BodyScreen {...props} route={route}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default WorkspaceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: '2.5%',
    },
    labelStyle: {
        fontSize: 16,
      },
    selectedLabelStyle: {
        fontSize: 16,
    },
    indicatorStyle: {
      backgroundColor: '#c20a0a',
      height: 3,
    }
})