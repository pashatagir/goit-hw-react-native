import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { fonts } from '../../assets/fonts/fonts';
import { Container } from '../../Components/Container';
import { AddComentButton } from '../../Components/Buttons';
import { AddCommentIcon, ArrowLeftIcon } from '../../Components/Icons';
import { format } from 'date-fns';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

const initStateComments = [
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

export const CommentsScreen = ({ route, navigation }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [text, setText] = useState(null);
  const [comments, setComments] = useState(initStateComments);
  const { wrapper, dateStyle, textStyle, avatar, input, wrapperInput } = styles;
  console.log(route.params);

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
    if (!text || text.length < 10 || text.length > 200) {
      return;
    }
    const newComment = {
      id: nanoid(),
      avatar: '../../assets/image/ellipse.png',
      text: text.trim(),
      date: format(Date.now(), 'dd MMMM yyy | kk:mm'),
    };

    setComments(prevState => [...prevState, newComment]);
    setText('');
    Keyboard.dismiss();
  };

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Posts')}
          style={styles.button}
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Comments</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 32,
        }}
      >
        <Image
          source={require('../../assets/image/sunset.jpg')}
          style={{ width: '100%', height: 240, borderRadius: 8 }}
        />

        {!isShowKeyboard && (
          <SafeAreaView>
            <FlatList
              data={comments}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    paddingLeft: index % 2 === 0 ? 44 : 0,
                    paddingRight: index % 2 === 0 ? 0 : 44,
                    marginTop: 24,
                  }}
                >
                  {index % 2 === 0 ? (
                    <Image
                      style={{
                        ...avatar,
                        alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                      }}
                      source={require('../../assets/image/ellipse.png')}
                    />
                  ) : (
                    <Image
                      style={{
                        ...avatar,
                        alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                      }}
                      source={require('../../assets/image/ellipseN.png')}
                    />
                  )}
                  <View
                    style={{
                      ...wrapper,
                      borderTopRightRadius: index % 2 === 0 ? 8 : 0,
                      borderTopLeftRadius: index % 2 === 0 ? 0 : 8,
                    }}
                  >
                    <Text style={textStyle}>{item.text}</Text>
                    <Text
                      style={{
                        ...dateStyle,
                        alignSelf: index % 2 === 0 ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {item.date}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        )}
        <View
          style={{
            ...wrapperInput,
            marginTop: 31,
          }}
        >
          <TextInput
            value={text}
            onChangeText={value =>
              setText(prevState => ({ ...prevState, text: value }))
            }
            onFocus={() => handlerFocus('text')}
            onEndEditing={() => handlerEndEditing('text')}
            placeholder="Add comment..."
            placeholderTextColor="#BDBDBD"
            style={{
              ...input,
              borderColor: isFocus.text ? '#FF6C00' : '#E8E8E8',
              backgroundColor: isFocus.text ? '#FFFFFF' : '#F6F6F6',
            }}
          />
          <AddComentButton onPress={handlerSubmit}>
            <AddCommentIcon />
          </AddComentButton>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 28,
    position: 'absolute',
  },
  wrapper: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  textStyle: {
    fontFamily: fonts.roboto400,
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
  dateStyle: {
    fontFamily: fonts.roboto400,
    fontSize: 10,
    lineHeight: 12,
    color: '#BDBDBD',
    marginTop: 8,
  },
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: 'solid',
    color: '#212121',
    fontFamily: fonts.roboto400,
    fontSize: 16,
    lineHeight: 18.75,
  },
  wrapperInput: { position: 'relative' },
  header: {
    marginTop: 20,
    height: 62,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  button: {
    position: 'absolute',
    left: 16,
  },
  title: {
    fontFamily: fonts.roboto500,
    fontSize: 17,
    letterSpacing: -0.408,
    lineHeight: 22,
  },
});
