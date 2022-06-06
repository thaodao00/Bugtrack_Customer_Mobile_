import React, { useState, useEffect, useMemo } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Text, View, Card} from 'react-native-ui-lib';
import ContentLoader from 'react-native-easy-content-loader';
import { DataTable } from 'react-native-paper';
import getEnvVars from '../../../../env';

const Stack = createStackNavigator();
const { apiUrl } = getEnvVars();

// Import helper
import { Helper } from '../../../helpers/index';
import axiosInstance from '../../../helpers/axios';

// Import Loader
import {NetworkIncorruptLoader} from '../../../components/NetworkIncorruptLoader';

type Props = {
    navigation: any;
    route: any;
    platform: any;
    appId: any;
}

interface IDataSource {
    bugId: number;
    cStatus: string;
    hStatus: string;
    cvssSeverity: string;
    ownerId: number;
    appId: number;
    testNameId: number;
    updateAt: string;
    updateById: number;
    testName: string;
    owner: string;
    updateBy: string;
    severityColor: string;
    hStatusColor: string;
    cStatusColor: string;
}

const initDataSource: IDataSource = {
    bugId: 0,
    cStatus: "",
    hStatus: "",
    cvssSeverity: "",
    ownerId: 0,
    appId: 0,
    testNameId: 0,
    updateAt: "",
    updateById: 0,
    testName: "",
    owner: "",
    updateBy: "",
    severityColor: "",
    hStatusColor: "",
    cStatusColor: ""
} 
  
const BodyScreen:React.FC<Props> = ({navigation, route, platform, appId}) => {

    const [isLoading, setLoading] = useState(true);
    const [isNetworkInCorrupt, setNetworkInCorrupt] = useState(false);
    const [masterDataSource, setMasterDataSource] = useState<IDataSource[]>([]);
    const [addonDataSource, setAddonDataSource] = useState<[{
        id: number;
        testName: string;
        owner: string;
        updateBy: string;
        severityColor: string;
        hStatusColor: string;
        cStatusColor: string;
      }]>([{
        id: 0,
        testName: "",
        owner: "",
        updateBy: "",
        severityColor: "",
        hStatusColor: "",
        cStatusColor: ""
      }]);

    //map data to masterDataSource
    if(masterDataSource && masterDataSource.length > 0) {
        masterDataSource.map(bug => {
                const testName = addonDataSource.find(testName => testName.id === bug.bugId)
                const owner = addonDataSource.find(owner => owner.id === bug.bugId)
                const updateBy = addonDataSource.find(updateBy => updateBy.id === bug.bugId)
                const severityColor = addonDataSource.find(severityColor => severityColor.id === bug.bugId)
                const hStatusColor = addonDataSource.find(hStatusColor => hStatusColor.id === bug.bugId)
                const cStatusColor = addonDataSource.find(cStatusColor => cStatusColor.id === bug.bugId)

                bug.testName = testName ? testName.testName : "";
                bug.owner = owner ? owner.owner : "";
                bug.updateBy = updateBy ? updateBy.updateBy : "";
                bug.severityColor = severityColor ? severityColor.severityColor : "";
                bug.hStatusColor = hStatusColor ? hStatusColor.hStatusColor : "";
                bug.cStatusColor = cStatusColor ? cStatusColor.cStatusColor : "";
            return bug
        });
    }

    useEffect(() => {
        axiosInstance.post(`${apiUrl}/mobile/workspaces/app`, {"platform": platform, "appId": appId})
        
        .then((response) => {
            try {
                if (response.data.status == 'Success') {
                    setMasterDataSource(response.data.data.bugs);
                    setAddonDataSource(response.data.data.infoByBug);
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
    }, []);

    const TableBugLoading = () => (
        <View>
            <Card flex style={{margin: 5 }} >
                <Card.Section/>
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

    const RenderTableBug = () => (
        <View>
        <ScrollView horizontal>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{width: 40}}>.No</DataTable.Title>
              <DataTable.Title style={{width: 80}}>Severity</DataTable.Title>
              <DataTable.Title style={{width: 200}}>TestCase</DataTable.Title>
              <DataTable.Title style={{width: 70}}>HStatus</DataTable.Title>
              <DataTable.Title style={{width: 70}}>CStatus</DataTable.Title>
              <DataTable.Title style={{width: 80}}>Owner</DataTable.Title>
              <DataTable.Title style={{width: 180}}>UpdateAt</DataTable.Title>
              <DataTable.Title style={{width: 150}}>By</DataTable.Title>
            </DataTable.Header>
            {
                masterDataSource && masterDataSource.length > 0 && masterDataSource.map((item, i) => (
                    <TouchableOpacity key={`item_${i}`} onPress={() => navigation.navigate('BugScreen', {appId: item['appId'], bugId: item['bugId']})}>
                        <DataTable.Row key={`item_${i}`}>
                            <DataTable.Cell style={{width: 40}}>{i+1}</DataTable.Cell>
                            <DataTable.Cell style={{width: 80}}><Text color={item['severityColor']}>{item['cvssSeverity']}</Text></DataTable.Cell>
                            <DataTable.Cell style={{width: 200}}>{item['testName']}</DataTable.Cell>
                            <DataTable.Cell style={{width: 70}}><Text color={item['hStatusColor']}>{item['hStatus']}</Text></DataTable.Cell>
                            <DataTable.Cell style={{width: 70}}><Text color={item['cStatusColor']}>{item['cStatus']}</Text></DataTable.Cell>
                            <DataTable.Cell style={{width: 80}}>{item['owner']}</DataTable.Cell>
                            <DataTable.Cell style={{width: 180}}>{item['updateAt']}</DataTable.Cell>
                            <DataTable.Cell style={{width: 150}}>{item['updateBy']}</DataTable.Cell>
                        </DataTable.Row>
                    </TouchableOpacity>
                ))
            }
          </DataTable>
          </ScrollView>
        </View>
        )
    return(
        <View style={styles.container}>
            <ScrollView>
            {
                isLoading
                ?
                <TableBugLoading />
                :
                isNetworkInCorrupt
                ?
                <NetworkIncorruptLoader />
                :
                <RenderTableBug />
            }
            </ScrollView>
        </View>
    )
};

const AppScreen:React.FC<Props> = ({ navigation, route }) => {
    const {appName, platform, appId} = route.params;
    
    return (
        <Stack.Navigator >    
            <Stack.Screen 
            name="App" 
            options={{
              title: appName,
              headerStyle: {
                backgroundColor: '#c20a0a', 
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize:20,
              },
            }} 
            initialParams={{appName, platform, appId}}>
                {props => <BodyScreen {...props} platform={platform} appId={appId}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
export default AppScreen;

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#fff',
    },
})