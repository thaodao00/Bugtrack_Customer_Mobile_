import React, { useState } from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {View, Text, Image, Colors, ListItem} from 'react-native-ui-lib';

// Import Icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Import getEnvVars() from env
import getEnvVars from '../../../env';
const { apiUrl } = getEnvVars();

type Props = {
    navigation: any;
}

const BodyScreen:React.FC<Props> = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.wrapperContainer}>
                    <View padding-s4>
                        <TouchableOpacity  style={styles.infoWrapper} onPress={() => navigation.navigate('ManageAccountScreen')}>
                            <MaterialIcons name="person" size={30} color="#e69138"/>
                            <Text style={styles.infoAccount}>Manage account</Text>
                        </TouchableOpacity>
                    </View>
                    <View padding-s4>
                        <TouchableOpacity  style={styles.infoWrapper} onPress={() => navigation.navigate('SecurityScreen')}>
                            <MaterialIcons name="policy" size={30} color="#6fd243"/>
                            <Text style={styles.infoAccount}>Security & login</Text>
                        </TouchableOpacity>
                    </View>
                    <View padding-s4>
                        <TouchableOpacity  style={styles.infoWrapper}  onPress={() => navigation.navigate('PushNotificationScreen')}>
                            <MaterialIcons name="notifications" size={30} color="#ffcb57"/>
                            <Text style={styles.infoAccount}>Push notifications</Text>
                        </TouchableOpacity>
                    </View>
                    <View padding-s4>
                        <TouchableOpacity  style={styles.infoWrapper} onPress={() => navigation.navigate('DarkModeScreen')}>
                            <MaterialIcons name="nightlight-round" size={30} color="#000000"/>
                            <Text style={styles.infoAccount}>Dark Mode</Text>
                        </TouchableOpacity>
                    </View>
                    <View padding-s4>
                        <TouchableOpacity  style={styles.infoWrapper} onPress={() => navigation.navigate('PaymentScreen')}>
                            <MaterialIcons name="payments" size={30} color="#c20a20"/>
                            <Text style={styles.infoAccount}>Payments & subscriptions</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const SettingScreen:React.FC<Props> = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Settings" options={{headerShown: false}}>
                {props => <BodyScreen {...props}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    wrapperContainer:{
        marginLeft:5,
        marginRight:5,
        marginTop: 5,
    },
    infoWrapper:{
        flex: 1,
        flexDirection: 'row',
    },
    titleNode:{
        fontSize: 15,
        marginLeft:20,
        marginBottom:10,
    },
    titleSettings:{
        fontSize: 30,
        marginLeft:20,
        marginTop:10,
        fontWeight: 'bold',
        
    },
    infoAccount:{
        fontSize: 20,
        marginLeft: 10
    },
    itemSwitch:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    headerWrapper: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 12,
        paddingLeft:10,
        paddingTop:30,
        
    },
})
