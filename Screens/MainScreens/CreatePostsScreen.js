import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  TextInput,
  View,
  Dimensions,
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
import { MainButton, TrashButton } from '../../Components/Buttons';
import { fonts } from '../../assets/fonts/fonts';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

const initialStatePost = {
  id: '',
  nameLocation: '',
  image: '',
  descriptionLocation: '',
  location: '',
  commentsCount: 0,
  likesCount: 0,
};

const initialStateFocus = {
  nameLocation: false,
  descriptionLocation: false,
};

export const CreatePostsScreen = ({ navigation, route }) => {
  const [isFocus, setIsFocus] = useState(initialStateFocus);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [post, setPost] = useState(initialStatePost);
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
    setPost(prevState => ({
      ...prevState,
      image: uri,
      location: coords,
    }));
  };

  const handlerFocus = input => {
    setIsShowKeyboard(true);
    setIsFocus(prevState => ({
      ...prevState,
      [input]: true,
    }));
  };

  const handlerEndEditing = input => {
    setIsShowKeyboard(false);
    setIsFocus(prevState => ({
      ...prevState,
      [input]: false,
    }));
  };

  const deviceHeight = Dimensions.get('window').height;

  const handlerSubmit = () => {
    setIsShowKeyboard(false);
    navigation.navigate('Home', {
      screen: 'Posts',
      params: post,
    });
    setPost(initialStatePost);
  };

  const handlerTrash = () => {
    setIsShowKeyboard(false);
    setPost(initialStatePost);
  };

  const { nameLocation, descriptionLocation, image } = post;

  return (
    <Container>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 32,
        }}
      >
        {image ? (
          <View>
            <Image
              source={{ uri: image }}
              style={{
                width: '100%',
                height: 240,
                borderRadius: 8,
              }}
            />
            <TouchableOpacity
              onPress={takePhoto}
              style={{
                ...styles.iconBox,
                backgroundColor: '#ffffff30',
                borderColor: 'transparent',
              }}
            >
              <CameraIcon style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            styles={{
              flex: 1,
            }}
          >
            <Camera type={type} ref={setCameraRef} style={styles.imageBox}>
              <View style={styles.iconsContainer}>
                <TouchableOpacity
                  onPress={takePhoto}
                  style={{ ...styles.iconBox, borderColor: '#E8E8E8' }}
                >
                  <CameraIcon style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
              </View>
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
            </Camera>
          </View>
        )}
        <Text
          style={styles.textStyle}
          onPress={() =>
            setPost(prevState => ({
              ...prevState,
              image: '',
            }))
          }
        >
          {image ? 'Edit photo' : 'Download photo'}
        </Text>
        <TextInput
          value={nameLocation}
          onChangeText={value =>
            setPost(prevState => ({ ...prevState, nameLocation: value }))
          }
          onFocus={() => handlerFocus('nameLocation')}
          onEndEditing={() => handlerEndEditing('nameLocation')}
          placeholder="Name..."
          placeholderTextColor="#BDBDBD"
          style={{
            ...styles.inputPost,
            marginBottom: 16,
            borderColor: isFocus.nameLocation ? '#FF6C00' : '#E8E8E8',
            backgroundColor: isFocus.nameLocation ? '#F6F6F6' : '#FFFFFF',
          }}
        />
        <View style={{ justifyContent: 'center' }}>
          <TextInput
            value={descriptionLocation}
            onChangeText={value =>
              setPost(prevState => ({
                ...prevState,
                descriptionLocation: value,
              }))
            }
            onFocus={() => handlerFocus('descriptionLocation')}
            onEndEditing={() => handlerEndEditing('descriptionLocation')}
            placeholder="Location..."
            placeholderTextColor="#BDBDBD"
            style={{
              ...styles.inputPost,
              marginBottom: 32,
              paddingLeft: 28,
              borderColor: isFocus.descriptionLocation ? '#FF6C00' : '#E8E8E8',
              backgroundColor: isFocus.descriptionLocation
                ? '#F6F6F6'
                : '#FFFFFF',
            }}
          />
          <MapPinIcon style={{ position: 'absolute', bottom: '55%' }} />
        </View>
        {nameLocation && descriptionLocation && image ? (
          <MainButton
            text={'Publish'}
            onPress={handlerSubmit}
            style={{
              marginBottom: deviceHeight < 1000 ? 40 : 120,
              backgroundColor: '#FF6C00',
            }}
          />
        ) : (
          <MainButton
            text={'Publish'}
            style={{ marginBottom: deviceHeight < 1000 ? 40 : 120 }}
          />
        )}
        <TrashButton onPress={handlerTrash}>
          <TrashIcon />
        </TrashButton>
      </View>
    </Container>
  );
};

export const styles = StyleSheet.create({
  camera: {
    borderRadius: 8,
  },
  imageBox: {
    width: '100%',
    height: 240,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  textStyle: {
    marginTop: 8,
    fontFamily: fonts.roboto400,
    fontSize: 16,
    lineHeight: 18.75,
    color: '#BDBDBD',
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
    borderRadius: 50,
    position: 'absolute',
    left: '40%',
    top: '38%',
    borderWidth: 1,
    justifyContent: 'center',
  },
  flipIconBox: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: '80%',
    left: '85%',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
  },
  cameraIcon: {
    alignSelf: 'center',
  },

  inputPost: {
    height: 50,
    borderBottomWidth: 1,
    color: '#212121',
    fontFamily: fonts.roboto400,
    fontSize: 16,
    lineHeight: 18.75,
  },
});
