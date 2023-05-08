import { useEffect, useState } from 'react';
import { Text, TextInput, View, Image, ImageBackground } from 'react-native';
import { AddAvatarIcon, RemoveAvatarIcon } from '../../Components/Icons';
import { AddAvatarButton, MainButton } from '../../Components/Buttons';
import { Container } from '../../Components/Container';
import { authStyles } from './authStyles';

const initialStateUser = {
  login: '',
  email: '',
  password: '',
  avatar: '',
};
const initialStateFocus = {
  login: false,
  email: false,
  password: false,
};

export const RegistrationScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(initialStateUser);
  const [userPhoto, setUserPhoto] = useState(null);
  const [isFocus, setIsFocus] = useState(initialStateFocus);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const handlerAddAvatar = () => {
    setUserPhoto('../../assets/image/avatar.png');
  };

  useEffect(() => {
    setUser(prevState => ({ ...prevState, avatar: userPhoto }));
  }, [userPhoto]);

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
    setUser(user);
    navigation.navigate('Home', {
      screen: 'Posts',
      params: { user },
    });
  };

  return (
    <Container>
      <ImageBackground
        source={require('../../assets/image/photo_bg.png')}
        style={authStyles.imgBg}
      >
        <View style={{ ...authStyles.form, paddingBottom: 78 }}>
          {!userPhoto ? (
            <View
              style={{
                ...authStyles.boxAvatar,
                backgroundColor: '#F6F6F6',
                transform: [{ translateX: 50 }],
              }}
            >
              <AddAvatarButton onPress={handlerAddAvatar}>
                <AddAvatarIcon />
              </AddAvatarButton>
            </View>
          ) : (
            <View
              style={{
                ...authStyles.boxAvatar,
                transform: [{ translateX: 50 }],
              }}
            >
              <Image source={require('../../assets/image/avatar.png')} />
              <AddAvatarButton onPress={() => setUserPhoto('')}>
                <RemoveAvatarIcon />
              </AddAvatarButton>
            </View>
          )}
          <Text style={authStyles.title}>Registration</Text>
          <TextInput
            value={user.login}
            onChangeText={value =>
              setUser(prevState => ({ ...prevState, login: value }))
            }
            onFocus={() => handlerFocus('login')}
            onEndEditing={() => handlerEndEditing('login')}
            placeholder="Login"
            placeholderTextColor="#BDBDBD"
            style={{
              ...authStyles.input,
              marginBottom: 10,
              borderColor: isFocus.login ? '#FF6C00' : '#E8E8E8',
              backgroundColor: isFocus.login ? '#FFFFFF' : '#F6F6F6',
            }}
          />
          <TextInput
            value={user.email}
            onChangeText={value =>
              setUser(prevState => ({ ...prevState, email: value }))
            }
            onFocus={() => handlerFocus('email')}
            onEndEditing={() => handlerEndEditing('email')}
            placeholder="E-mail"
            placeholderTextColor="#BDBDBD"
            style={{
              ...authStyles.input,
              marginBottom: 10,
              borderColor: isFocus.email ? '#FF6C00' : '#E8E8E8',
              backgroundColor: isFocus.email ? '#FFFFFF' : '#F6F6F6',
            }}
          />
          <View style={{ ...authStyles.wrapperInput, marginBottom: 43 }}>
            <TextInput
              value={user.password}
              onChangeText={value =>
                setUser(prevState => ({ ...prevState, password: value }))
              }
              onFocus={() => handlerFocus('password')}
              onEndEditing={() => handlerEndEditing('password')}
              placeholder="Password"
              placeholderTextColor="#BDBDBD"
              secureTextEntry={show ? false : true}
              style={{
                ...authStyles.input,
                borderColor: isFocus.password ? '#FF6C00' : '#E8E8E8',
                backgroundColor: isFocus.password ? '#FFFFFF' : '#F6F6F6',
              }}
            />
            <Text
              style={authStyles.buttonShowPassword}
              onPress={() => setShow(!show)}
            >
              {show ? 'Hide' : 'Show'}
            </Text>
          </View>

          <MainButton onPress={handlerSubmit} text={'Registr'} />
          <Text
            style={authStyles.link}
            onPress={() => navigation.navigate('Login')}
          >
            Already have an account? Sign in
          </Text>
        </View>
      </ImageBackground>
    </Container>
  );
};
