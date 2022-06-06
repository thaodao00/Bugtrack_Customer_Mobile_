import React, { useState } from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {View, Text, Image, Colors, ListItem} from 'react-native-ui-lib';

// Import Icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Import getEnvVars() from env
import getEnvVars from '../../../../env';
const { apiUrl } = getEnvVars();

type Props = {
    navigation: any;
}

const BodyScreen:React.FC<Props> = ({navigation}) => {

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text>Dev</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const SocHomeScreen:React.FC<Props> = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="Soc">
            <Stack.Screen name="SocHome" options={{headerShown: false}}>
                {props => <BodyScreen {...props}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default SocHomeScreen;

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
