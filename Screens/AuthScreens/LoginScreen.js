import { useState, useEffect } from 'react';
import { Text, TextInput, View, ImageBackground } from 'react-native';
import { MainButton } from '../../Components/Buttons';
import { Container } from '../../Components/Container';
import { authStyles } from './authStyles';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../redux/auth/authOperations';

const initialStateUser = {
  userEmail: '',
  password: '',
};

const initialStateFocus = {
  userEmail: false,
  password: false,
};

export const LoginScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(initialStateUser);
  const [isFocus, setIsFocus] = useState(initialStateFocus);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const dispatch = useDispatch();

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
    dispatch(authLogin(user));
  };

  return (
    <Container>
      <ImageBackground
        source={require('../../assets/image/photo_bg.png')}
        style={authStyles.imgBg}
      >
        <View
          style={{
            ...authStyles.form,
            paddingBottom: isShowKeyboard ? 79 : 129,
          }}
        >
          <Text style={{ ...authStyles.title, marginTop: 32 }}>Sign in</Text>
          <TextInput
            value={user.userEmail}
            onChangeText={value =>
              setUser(prevState => ({ ...prevState, userEmail: value }))
            }
            onFocus={() => handlerFocus('userEmail')}
            onEndEditing={() => handlerEndEditing('userEmail')}
            placeholder="E-mail"
            placeholderTextColor="#BDBDBD"
            style={{
              ...authStyles.input,
              marginBottom: 10,
              borderColor: isFocus.userEmail ? '#FF6C00' : '#E8E8E8',
              backgroundColor: isFocus.userEmail ? '#FFFFFF' : '#F6F6F6',
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
          <MainButton onPress={handlerSubmit} text={'Sign in'} />
          <Text
            style={authStyles.link}
            onPress={() => navigation.navigate('Registration')}
          >
            I don't have an account! Sign up now
          </Text>
        </View>
      </ImageBackground>
    </Container>
  );
};
