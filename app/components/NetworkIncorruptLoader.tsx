import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { View, Text, Image, Button } from 'react-native-ui-lib';

// Import Icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { RootStateOrAny, useSelector } from 'react-redux';

type Props = {
  message?: string;
  props?: any;
}
const NetworkIncorruptLoader:React.FC<Props> = React.memo(({props}) => {
  //const {loading, ...attributes} = props;

  const statusError =  useSelector((state : RootStateOrAny) => state?.statusError);

  return statusError?.code !== 0 ? <React.Fragment>
      <View style={styles.container}>
        <MaterialIcons name="cloud-off" size={28} />
        <Text>Ops...!!</Text>
        <Text>{statusError?.message}</Text>
      </View>

  </React.Fragment> : <React.Fragment />
})

NetworkIncorruptLoader.displayName="NetworkIncorruptLoader";
export {NetworkIncorruptLoader};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: windowHeight / 3,
  },
});