import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';

// Import Icon
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

type Props = {
    navigation: any;
}

const BodyScreen: React.FC<Props> = ({ navigation }) => {
    const auth = useSelector((state: RootStateOrAny) => state?.auth);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.containerTitle}>Bugtrack Workspace</Text>
                <Text style={styles.containerText}>All application's </Text>
                <View style={styles.containerContent}>
                    <View style={styles.containerBox}>
                        <View style={styles.containerBoxItem}>
                            {/* web */}
                            <View style={styles.containerItems}>
                                <TouchableOpacity onPress={() => navigation.navigate('WorkspaceStack', { initialIndex: 0 })}>
                                    <View style={styles.containerItemWeb}>
                                        <MaterialIcons name="language" color="#c49678" size={30} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ color: '#b7b7b7' }}>Web</Text>
                            </View>

                            {/* mobile */}
                            <View style={styles.containerItems}>
                                <TouchableOpacity onPress={() => navigation.navigate('WorkspaceStack', { initialIndex: 1 })}>
                                    <View style={styles.containerItemMobile}>
                                        <MaterialIcons name="phone-iphone" color="#be6868" size={30} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ color: '#b7b7b7' }}>Mobile</Text>
                            </View>

                            {/* API web service */}
                            <View style={styles.containerItems}>
                                <TouchableOpacity onPress={() => navigation.navigate('WorkspaceStack', { initialIndex: 2 })} >
                                    <View style={styles.containerItemAPI}>
                                        <SimpleLineIcons name="graph" color="#7ca5aa" size={30} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ color: '#b7b7b7' }}>API</Text>
                            </View>

                            {/* Source code */}
                            <View style={styles.containerItems}>
                                <TouchableOpacity onPress={() => navigation.navigate('WorkspaceStack', { initialIndex: 3 })}>
                                    <View style={styles.containerItemSourceCode}>
                                        <MaterialIcons name="code" color="#959aa0" size={30} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ color: '#b7b7b7' }}>Source Code</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const BugTrackHomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="BugTrack">
            <Stack.Screen name="BugTrackHome" options={{ headerShown: false }}>
                {props => <BodyScreen {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}


export default BugTrackHomeScreen;

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
    containerItemWeb: {
        width: 60,
        height: 60,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#faddca',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
    },
    containerItemMobile: {
        width: 60,
        height: 60,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#f6c1c1',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
    },
    containerItemAPI: {
        width: 60,
        height: 60,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#cde7ea',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
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