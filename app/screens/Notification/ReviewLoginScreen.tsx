import React, { useState } from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {View, Text, Card} from 'react-native-ui-lib';

// Import Icon
import FontAwesome from '@expo/vector-icons/FontAwesome'

import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

type Props = {
    navigation: any;
}

const ReviewLoginScreen:React.FC<Props> = ({navigation}) => {
    const {params} = useRoute<any>();

    return (
        <View style={styles.container}>
            <ScrollView>
            <Card style={{margin: 5}}>
                <View padding-20>
                    <View>
                        <Text text60 $textDefault>Welcome {params.username}!</Text>
                        <Text style={styles.items}>Email: ###</Text>
                        <Text style={styles.items}>Approximately: {params.created_at}</Text>
                        <Text style={styles.items}>IP: {params.clientIp}</Text>
                        <Text style={styles.items}>User Agent: {params.userAgent}</Text>
                        <Text style={styles.items}>Country: {params.country}</Text>
                        <Text style={styles.items}>Country Code: {params.countryCode}</Text>
                        <Text style={styles.items}>Region: {params.region}</Text>
                        <Text style={styles.items}>Region Name: {params.regionName}</Text>
                        <Text style={styles.items}>City: {params.city}</Text>
                        <Text style={styles.items}>Timezone: {params.timezone}</Text>
                        <Text style={styles.items}>ISP: {params.isp}</Text>
                        <Text style={styles.items}>ASN: {params.asn}</Text>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() =>  Linking.openURL('mailto:ltphuc@hpt.vn?subject=[Help BugTrackAccount]An unrecognized device recently attempted to access my account&body=Image: {Attached screenshot}')} >
                        <FontAwesome name="user-secret" size={28} color="#5848FF" />
                        <Text style={styles.txt}>This wasn't me</Text>
                    </TouchableOpacity>
                </View>
            </Card>
            </ScrollView>
        </View>
    )
}

export default ReviewLoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    items: {
        fontSize: 17,
        marginBottom: 5
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    txt: {
        fontSize: 17,
        color: '#5848FF',
        marginLeft: 5,
        marginRight: 10,
    }
})
