import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { styles } from '../styles';
import { Container } from '../../Components/Container';
import { CameraIcon, TrashIcon } from '../../Components/Icons';
import { MainButton, TrashButton } from '../../Components/Buttons';

const initialStateComments = [
  {
    id: '1',
    avatar: '../../assets/image/ellipse.png',
    text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
    date: '09 june 2020 | 08:40',
  },
  {
    id: '2',
    avatar: '../../assets/image/ellipseN.png',
    text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
    date: '09 june 2020 | 09:14',
  },
  {
    id: '3',
    avatar: '../../assets/image/ellipse.png',
    text: 'Thank you! That was very helpful!',
    date: '09 june 2020 | 09:40',
  },
];

const initialStateFocus = {
  comment: false,
};

export const CommentsScreen = ({ navigation }) => {
  const [isFocus, setIsFocus] = useState(initialStateFocus);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comments, setComments] = useState(initialStateComments);

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

  const handlerSubmit = () => {
    setIsShowKeyboard(false);
    setComments(prevState => ({ ...prevState, comments }));
    navigation.navigate('Home', {
      screen: 'Posts',
      post,
    });
  };

  return (
    <Container>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 32,
        }}
      >
        <Image
          source={require('../../assets/image/contentBlock.png')}
          style={{ width: '100%', height: 240, borderRadius: 8 }}
        />
        <SafeAreaView>
          <FlatList
            data={comments}
            renderItem={({ item }) => <Text>{item.title}</Text>}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    </Container>
  );
};
