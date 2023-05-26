import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Container } from '../../Components/Container';
import {
  CameraIcon,
  MapPinIcon,
  TrashIcon,
  FlipCameraIcon,
} from '../../Components/Icons';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export const CameraScreen = ({ navigation, route }) => {
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      if (status === 'granted') {
        setHasPermission(true);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Grant permission to camera for further use!</Text>;
  }

  const takePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    await MediaLibrary.createAssetAsync(uri);
    setPhoto(uri);
  };

  const handlerSubmit = () => {
    navigation.navigate('Registration', { photo });
  };
  return (
    <SafeAreaView
      styles={{
        flex: 1,
      }}
    >
      <Camera type={type} ref={setCameraRef} style={styles.camera}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={{ ...styles.flipIconBox, borderRadius: 8 }}
            onPress={handlerSubmit}
          >
            <Image
              source={{ uri: photo }}
              style={{
                width: 60,
                height: 60,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={takePhoto}
            style={{ ...styles.iconBox, borderColor: '#E8E8E8' }}
          >
            <CameraIcon style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipIconBox}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <FlipCameraIcon style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  iconsContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
  },
  flipIconBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
  },
  cameraIcon: {
    alignSelf: 'center',
  },
});
