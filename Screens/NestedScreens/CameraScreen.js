import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraIcon, FlipCameraIcon } from '../../Components/Icons';

export const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      const statusLocation = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted' && statusLocation.status === 'granted') {
        setHasPermission(true);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <Text>Grant permission to camera and location for further use!</Text>
    );
  }

  const takePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(uri);
    const { coords } = await Location.getCurrentPositionAsync();
    const paramsPhoto = { photo: uri, location: coords };
    navigation.navigate('Home', {
      screen: 'Create',
      params: paramsPhoto,
    });
  };

  return (
    <View
      styles={{
        flex: 1,
      }}
    >
      <Camera type={type} ref={setCameraRef} style={styles.imageBox}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={takePhoto} style={styles.iconBox}>
            <CameraIcon style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.iconBox, width: 40, height: 40, marginLeft: 16 }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <FlipCameraIcon style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    width: '100%',
    height: '100%',
  },
  iconsContainer: {
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  iconBox: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
  },
});
