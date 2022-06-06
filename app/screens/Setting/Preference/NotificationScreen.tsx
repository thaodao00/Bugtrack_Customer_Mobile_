import React, { useState } from 'react';
import { StyleSheet, Linking } from 'react-native';
import {View, Text, Card, Button, Checkbox} from 'react-native-ui-lib';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

type Props = {
    navigation: any;
}

const BodyScreen:React.FC<Props> = ({navigation}) => {
    const [isCheckedLogin, setIsCheckedLogin] = useState(false);
    const [isCheckedProject, setIsCheckedProject] = useState(false);
    const [isCheckedBug, setIsCheckedBug] = useState(false);
    const [isChecked2FA, setIsChecked2FA] = useState(false);
    
    return (
        <View style={styles.container}>
            <Card style={{margin: 15}}>
                <View padding-20>
                    <Text text50 $textDefault>
                        Allow Push Notifications
                    </Text>
                    <Text text80 $textDefault>
                        You can allow / disallow notifications in your device's settings.
                    </Text>

                    <View>
                        <View row right>
                            <Button text90 link label="Open Settings" onPress={() => Linking.openSettings()}/>
                        </View>
                    </View>
                </View>
            </Card>
            <Card style={{margin: 15}}>
                <View padding-20>
                    <Text text50 $textDefault>
                        Your Notifications
                    </Text>
                    <View>
                        <Checkbox style={{margin: 5}} label='Login' value={isCheckedLogin} onValueChange={() => setIsCheckedLogin(!isCheckedLogin)}/>
                        <Checkbox style={{margin: 5}} label='Project' value={isCheckedProject} onValueChange={() => setIsCheckedProject(!isCheckedProject)}/>
                        <Checkbox style={{margin: 5}} label='Bug' value={isCheckedBug} onValueChange={() => setIsCheckedBug(!isCheckedBug)}/>
                        <Checkbox style={{margin: 5}} label='2FA' value={isChecked2FA} onValueChange={() => setIsChecked2FA(!isChecked2FA)}/>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const PushNotificationScreen:React.FC<Props> = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="PushNotification" options={{headerShown: false}}>
                {props => <BodyScreen {...props}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default PushNotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
})