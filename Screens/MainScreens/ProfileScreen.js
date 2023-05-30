import { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  AddAvatarIcon,
  CommentOnIcon,
  LikeOnIcon,
  LogOutIcon,
  MapPinIcon,
  RemoveAvatarIcon,
} from '../../Components/Icons';
import { AddAvatarButton } from '../../Components/Buttons';
import { Container } from '../../Components/Container';
import { fonts } from '../../assets/fonts/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout, changeAvatar } from '../../redux/auth/authOperations';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { selectAvatar, selectUser } from '../../redux/auth/authSelectors';
import { selectPosts } from '../../redux/posts/postSelectors';
import { changeLikes, getPosts } from '../../redux/posts/postOperations';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase/config';

export const ProfileScreen = ({ route, navigation }) => {
  const { userName } = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const [avatarUri, setAvatarUri] = useState(null);
  const avatarURL = useSelector(selectAvatar);
  const deviceHeight = Dimensions.get('window').height;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (avatarURL) {
      setAvatarUri(avatarURL);
    }
  }, [avatarURL]);

  const removeAvatar = async () => {
    const avatarRef = ref(storage, avatarURL);
    await deleteObject(avatarRef)
      .then(() => {
        dispatch(changeAvatar(''));
        setAvatarUri(null);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/image/photo_bg.png')}
        style={profileStyles.imgBg}
      >
        <View style={profileStyles.form}>
          <View style={{ alignItems: 'flex-end', marginTop: 22 }}>
            <LogOutIcon
              onPress={() => {
                dispatch(authLogout());
              }}
            />
          </View>
          {avatarUri ? (
            <View
              style={{
                ...profileStyles.boxAvatar,
                transform: [{ translateX: 50 }],
              }}
            >
              <Image
                source={{ uri: avatarURL || null }}
                style={{ width: 120, height: 120, borderRadius: 16 }}
              />
              <AddAvatarButton onPress={removeAvatar}>
                <RemoveAvatarIcon />
              </AddAvatarButton>
            </View>
          ) : (
            <View
              style={{
                ...profileStyles.boxAvatar,
                backgroundColor: '#F6F6F6',
                transform: [{ translateX: 50 }],
              }}
            >
              <AddAvatarButton
                onPress={() =>
                  navigation.navigate('Camera', { params: route.name })
                }
              >
                <AddAvatarIcon />
              </AddAvatarButton>
            </View>
          )}
          <Text style={profileStyles.title}>{userName}</Text>
          <View style={{ marginBottom: 283 }}>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 32 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: '100%', height: 240, borderRadius: 8 }}
                  />
                  <Text style={{ fontSize: 16, color: '#000' }}>
                    {item.nameLocation}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}
                  >
                    <View
                      style={{
                        flex: 2,
                        flexDirection: 'row',
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          marginRight: 24,
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          navigation.navigate('Comments', {
                            image: item.image,
                            postId: item.postId,
                            params: route.name,
                          });
                        }}
                      >
                        <CommentOnIcon />
                        <Text style={{ marginLeft: 6 }}>
                          {item.commentsCount}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => dispatch(changeLikes(item.postId))}
                      >
                        <LikeOnIcon />
                        <Text style={{ marginLeft: 6 }}>{item.likes}</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() =>
                        navigation.navigate('Map', {
                          latitude: item.latitude,
                          longitude: item.longitude,
                          params: route.name,
                        })
                      }
                    >
                      <MapPinIcon />
                      <Text
                        style={{
                          marginLeft: 6,
                          textDecorationLine: 'underline',
                        }}
                      >
                        {item.descriptionLocation}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={() => nanoid()}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export const profileStyles = StyleSheet.create({
  imgBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  form: {
    flex: 1,
    width: '100%',
    position: 'relative',
    top: 147,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 106,
  },
  title: {
    color: '#212121',
    textAlign: 'center',
    fontFamily: fonts.roboto700,
    fontSize: 30,
    marginTop: 46,
    marginBottom: 32,
  },
  boxAvatar: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: -60,
    right: '50%',
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
});
