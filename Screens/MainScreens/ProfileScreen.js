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

const initStatePosts = [
  {
    id: '1',
    image:
      'http://www.golos.com.ua/images_article/orig/2020/08/270820/zakarpatlis.jpg',
    nameLocation: 'Forest',
    descriptionLocation: 'Ukraine',
    location: { latitude: 48.383022, longitude: 31.1828699 },
    commentsCount: 8,
    likesCount: 153,
  },
  {
    id: '2',
    image: 'http://mixo.com.ua/wp-content/uploads/2019/02/chernoe_more.jpg',
    nameLocation: 'Sunset on Black Sea',
    descriptionLocation: 'Ukraine',
    location: { latitude: 44.95719, longitude: 34.11079 },
    commentsCount: 10,
    likesCount: 200,
  },
  {
    id: '3',
    image:
      'https://www.oldhousedreams.com/wp-content/uploads/2021/04/13-spoletoitaly.jpg',
    nameLocation: 'Old house in Venice',
    descriptionLocation: 'Italy',
    location: { latitude: 41.29246, longitude: 12.5736108 },
    commentsCount: 50,
    likesCount: 200,
  },
];

export const ProfileScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState(initStatePosts);
  const [userPhoto, setUserPhoto] = useState('../../assets/image/avatar.png');

  const handlerAddAvatar = () => {
    setUserPhoto('../../assets/image/avatar.png');
  };

  return (
    <Container>
      <ImageBackground
        source={require('../../assets/image/photo_bg.png')}
        style={profileStyles.imgBg}
      >
        <View style={profileStyles.form}>
          <View style={{ alignItems: 'flex-end', marginTop: 22 }}>
            <LogOutIcon onPress={() => navigation.navigate('Login')} />
          </View>
          {userPhoto ? (
            <View
              style={{
                ...profileStyles.boxAvatar,
                transform: [{ translateX: 50 }],
              }}
            >
              <Image source={require('../../assets/image/avatar.png')} />
              <AddAvatarButton onPress={() => setUserPhoto('')}>
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
              <AddAvatarButton onPress={handlerAddAvatar}>
                <AddAvatarIcon />
              </AddAvatarButton>
            </View>
          )}
          <Text style={profileStyles.title}>Natali Romanova</Text>
          <SafeAreaView style={{ flex: 1, paddingBottom: 83 }}>
            <FlatList
              data={posts}
              renderItem={({ item, index }) => (
                <View style={{ marginTop: 32 }}>
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
                          navigation.navigate('Comments');
                        }}
                      >
                        <CommentOnIcon />
                        <Text style={{ marginLeft: 6 }}>
                          {item.commentsCount}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <LikeOnIcon />
                        <Text style={{ marginLeft: 6 }}>{item.likesCount}</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() =>
                        navigation.navigate('Map', {
                          data: item.location,
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
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </Container>
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
