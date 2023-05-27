import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { CameraIcon, FlipCameraIcon } from '../../Components/Icons';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { storage } from '../../firebase/config';
import { db } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImageManipulator from 'expo-image-manipulator';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { postSlice } from '../../redux/posts/postSlice';
import { updateAvatar } from '../../redux/auth/authOperations';
import { useDispatch } from 'react-redux';

export const CameraScreen = ({ navigation, route }) => {
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const dispatch = useDispatch();
  const screen = route.params.params;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted' && locationStatus.status === 'granted') {
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
    const location = await Location.getCurrentPositionAsync();
    setLocation(location.coords);
    setPhoto(uri);
  };

  const uploadPhotoToServer = async () => {
    const { uri } = await ImageManipulator.manipulateAsync(
      photo,
      [{ resize: { width: 800 } }],
      {
        compress: 0.7,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );
    const res = await fetch(photo);
    const file = await res.blob();

    const uniqId = nanoid();
    const imageRef =
      screen === 'Create'
        ? ref(storage, `photo_post/post_${uniqId}`)
        : ref(storage, `users_avatar/avatar_${uniqId}`);
    try {
      await uploadBytes(imageRef, file);
      const processedPhoto = await getDownloadURL(imageRef);
      return processedPhoto;
    } catch (error) {
      console.log(error);
    }
  };

  const savePhoto = async () => {
    const downloadedPhoto = await uploadPhotoToServer();
    if (screen === 'Create') {
      dispatch(
        postSlice.actions.updateImage({
          image: downloadedPhoto,
          latitude: location.latitude,
          longitude: location.longitude,
        })
      );
    } else dispatch(updateAvatar(downloadedPhoto));

    switch (screen) {
      case 'Registration':
        navigation.navigate('Registration', { photoUri: downloadedPhoto });
        break;
      case 'Profile':
        navigation.navigate('Profile', { photoUri: downloadedPhoto });
        break;
      case 'Create':
        navigation.navigate('Home', {
          screen: 'Create',
        });
        break;
      default:
        break;
    }
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
            onPress={savePhoto}
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
