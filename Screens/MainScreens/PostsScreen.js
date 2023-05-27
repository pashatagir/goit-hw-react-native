import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Container } from '../../Components/Container';
import { fonts } from '../../assets/fonts/fonts';
import { CommentOnIcon, LikeOnIcon, MapPinIcon } from '../../Components/Icons';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

const initStatePosts = [
  {
    id: '1',
    image:
      'http://www.golos.com.ua/images_article/orig/2020/08/270820/zakarpatlis.jpg',
    nameLocation: 'Forest',
    descriptionLocation: 'Ukraine',
    latitude: 48.383022,
    longitude: 31.1828699,
    commentsCount: 8,
    likesCount: 153,
  },
  {
    id: '2',
    image: 'http://mixo.com.ua/wp-content/uploads/2019/02/chernoe_more.jpg',
    nameLocation: 'Sunset on Black Sea',
    descriptionLocation: 'Ukraine',
    latitude: 44.95719,
    longitude: 34.11079,
    commentsCount: 10,
    likesCount: 200,
  },
  {
    id: '3',
    image:
      'https://www.oldhousedreams.com/wp-content/uploads/2021/04/13-spoletoitaly.jpg',
    nameLocation: 'Old house in Venice',
    descriptionLocation: 'Italy',
    latitude: 41.29246,
    longitude: 12.5736108,
    commentsCount: 50,
    likesCount: 200,
  },
];

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState(initStatePosts);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <Container>
      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: 'row',
          paddingTop: 32,
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../assets/image/avatar.png')}
          style={{ width: 60, height: 60 }}
        />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontFamily: fonts.roboto700 }}>
            {'Natali Romanova'}
          </Text>
          <Text>{'email@example.com'}</Text>
        </View>
      </View>
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 83 }}
      >
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
                      navigation.navigate('Comments', { params: route.name });
                    }}
                  >
                    <CommentOnIcon />
                    <Text style={{ marginLeft: 6 }}>{item.commentsCount}</Text>
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
                      latitude: item.latitude,
                      longitude: item.longitude,
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
      </SafeAreaView>
    </Container>
  );
};
