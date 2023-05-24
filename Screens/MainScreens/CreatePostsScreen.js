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
import { CameraIcon, MapPinIcon, TrashIcon } from '../../Components/Icons';
import { MainButton, TrashButton } from '../../Components/Buttons';
import { fonts } from '../../assets/fonts/fonts';

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

  useEffect(() => {
    if (route.params) {
      setPost(prevState => ({
        ...prevState,
        id: Math.floor(Math.random() * 1675477215).toString(16),
        image: route.params?.photo,
        location: route.params?.location,
      }));
    }
  }, [route.params]);

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
              onPress={() => navigation.navigate('Camera')}
              style={{
                ...styles.iconBox,
                backgroundColor: '#ffffff30',
              }}
            >
              <CameraIcon style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.imageBox}
            onPress={() => navigation.navigate('Camera')}
          >
            <View
              style={{
                ...styles.iconBox,
                backgroundColor: '#ffffff',
              }}
            >
              <CameraIcon style={styles.cameraIcon} />
            </View>
          </TouchableOpacity>
        )}
        <Text
          style={styles.textStyle}
          onPress={() => navigation.navigate('Camera')}
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
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 50,
    position: 'absolute',
    left: '40%',
    top: '38%',
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
