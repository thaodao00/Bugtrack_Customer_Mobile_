import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Card, Checkbox} from 'react-native-ui-lib';

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
                        DarkMode
                    </Text>
                    <Text text80 $textDefault>
                        We'll adjust your appearance based on your device's system setting.
                    </Text>

                    <View>
                        <Checkbox style={{margin: 5}} label="On" value={false} onValueChange={() => console.log('value changed')}/>
                        <Checkbox style={{margin: 5}} label="Off" value={false} onValueChange={() => console.log('value changed')}/>
                        <Checkbox style={{margin: 5}} label="System" value={false} onValueChange={() => console.log('value changed')}/>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const DarkModeScreen:React.FC<Props> = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen name="DarkMode" options={{headerShown: false}}>
                {props => <BodyScreen {...props}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default DarkModeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
})