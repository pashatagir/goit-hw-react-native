import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { selectComments } from '../../redux/posts/postSelectors';
import {
  getCommentsByPostId,
  uploadComments,
} from '../../redux/posts/postOperations';
import { selectUser } from '../../redux/auth/authSelectors';

export const CommentsScreen = ({ route, navigation }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [text, setText] = useState(null);
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const { userName, avatar, userId } = useSelector(selectUser);

  const { postId, image } = route.params;
  const screen = route.params.params;

  // item.userId===userId

  useEffect(() => {
    dispatch(getCommentsByPostId(postId));
  }, [dispatch]);

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
    if (!text || text.length < 10 || text.length > 100) {
      return;
    }
    const newComment = {
      commentId: nanoid(),
      text: text.trim(),
      date: format(Date.now(), 'dd MMMM yyy | kk:mm'),
      postId,
    };

    dispatch(uploadComments(newComment));
    dispatch(getCommentsByPostId(postId));

    setText('');
    Keyboard.dismiss();
  };

  const { wrapper, dateStyle, textStyle, avatarComment, input, wrapperInput } =
    styles;
  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (screen === 'Posts') {
              navigation.navigate('Posts');
            } else navigation.navigate('Profile');
          }}
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
          source={{ uri: image }}
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
                        ...avatarComment,
                        alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                      }}
                      source={{ uri: avatar }}
                    />
                  ) : (
                    <Image
                      style={{
                        ...avatarComment,
                        alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                      }}
                      source={{ uri: avatar }}
                    />
                  )}
                  <View
                    style={{
                      ...wrapper,
                      borderTopRightRadius: index % 2 === 0 ? 8 : 0,
                      borderTopLeftRadius: index % 2 === 0 ? 0 : 8,
                    }}
                  >
                    <Text style={{ fontFamily: fonts.roboto500 }}>
                      {userName}:
                    </Text>
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
              keyExtractor={item => item.commentId}
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
            onChangeText={setText}
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
  avatarComment: {
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
