import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Image, Card, Button} from 'react-native-ui-lib';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

type Props = {
    navigation: any;
}

const BodyScreen:React.FC<Props> = ({navigation}) => {
    
    return (
        <View style={styles.container}>
            <Card style={{margin: 15}}>
                <View padding-20>
                    <Text text50 $textDefault>
                    Lock Account
                    </Text>
                    <Text text80 $textDefault>
                        If you detect an unusual login on your account. Please Lock Account and contact Administrator as soon as possible for support.
                    </Text>

                    <View>
                        <View row right>
                            <Button text90 link label="Lock Account" onPress={() => (console.log('123'))}/>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const ManageAccountScreen:React.FC<Props> = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="ManageAccount" options={{headerShown: false}}>
                {props => <BodyScreen {...props}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default ManageAccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
})