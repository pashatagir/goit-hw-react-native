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
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/authSelectors';
import { selectPosts } from '../../redux/posts/postSelectors';
import { changeLikes, getPosts } from '../../redux/posts/postOperations';

export const PostsScreen = ({ navigation, route }) => {
  const { userName, userEmail, avatar } = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: 'row',
          paddingVertical: 32,
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: avatar ? avatar : null }}
          style={{ width: 60, height: 60, borderRadius: 8 }}
        />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontFamily: fonts.roboto700 }}>{userName}</Text>
          <Text>{userEmail}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 200 }}>
        <FlatList
          data={posts}
          renderItem={({ item, index }) => (
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
                    <Text style={{ marginLeft: 6 }}>{item.commentsCount}</Text>
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
    </SafeAreaView>
  );
};
