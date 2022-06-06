import React, { useState, useEffect , useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { createStackNavigator } from '@react-navigation/stack';
import {Feather as Icon} from '@expo/vector-icons';
import getEnvVars from '../../../../env';
import { async } from 'validate.js';
const Stack = createStackNavigator();
const { apiUrl } = getEnvVars();

type Props = {
    navigation: any;
    accessToken: any;
}
const BodyScreen:React.FC<Props>= () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
    const cam = useRef<Camera | null>();

  const _takePicture = async () => {
    if (cam.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      let photo = await cam.current.takePictureAsync(options);

      console.log(cam.current.getSupportedRatiosAsync());

      const source = photo.uri;
      if(source){
        cam.current.resumePreview();
        console.log('pocture source', source)
      }
    }
  };
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera ref={cam} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
             style={styles.icon}
            onPress={() => _takePicture()
            }>
            <Icon name="aperture" size={50} color="#666"/>
          </TouchableOpacity>
       
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  icon: {
    flex: 1,
    alignSelf: 'flex-end',
    alignContent: 'center',
    alignItems:'center',
    // marginBottom:10
    marginLeft: 30
  },
  button :{
    width: 30
  }

});
const CameraScreen:React.FC<Props> = ({ navigation, accessToken }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Camera" options={{headerShown: false}}>
                {props => <BodyScreen {...props} accessToken={accessToken} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}


export default CameraScreen;