import { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  ImageBackground,
} from 'react-native';
import { AddAvatarIcon, RemoveAvatarIcon } from '../assets/image/Icons';
import {
  AddAvatarButton as AvatarButton,
  AuthButton,
} from '../Components/Button';
import { Container } from '../Components/Container';
import { styles } from './styles';

const initialStateUser = {
  login: '',
  email: '',
  password: '',
};
const initialStateFocus = {
  login: false,
  email: false,
  password: false,
};

export const RegistrationScreen = () => {
  console.log(Platform.OS);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(initialStateUser);
  const [isFocus, setIsFocus] = useState(initialStateFocus);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const handlerSubmit = () => {
    setIsShowKeyboard(false);
    Alert.alert(JSON.stringify(user));
    console.log(user);
    setUser(initialStateUser);
  };

  const handleFocus = input => {
    setIsShowKeyboard(true);
    setIsFocus(prevState => ({
      ...prevState,
      [input]: true,
    }));
  };

  const handleEndEditing = input => {
    setIsShowKeyboard(false);
    setIsFocus(prevState => ({
      ...prevState,
      [input]: false,
    }));
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? -165 : -110}
      >
        <View style={{ ...styles.form, paddingBottom: 78 }}>
          {!isShowKeyboard ? (
            <View style={{ ...styles.boxAvatar, backgroundColor: '#F6F6F6' }}>
              <AvatarButton onPress={() => setIsShowKeyboard(true)}>
                <AddAvatarIcon />
              </AvatarButton>
            </View>
          ) : (
            <View style={styles.boxAvatar}>
              <Image source={require('../assets/image/avatar.png')} />
              <AvatarButton onPress={() => setIsShowKeyboard(false)}>
                <RemoveAvatarIcon />
              </AvatarButton>
            </View>
          )}
          {/* {isShowKeyboard ? <RemoveAvatarIcon /> : <AddAvatarIcon />} */}
          <Text style={styles.title}>Registration</Text>
          <TextInput
            value={user.login}
            onChangeText={value =>
              setUser(prevState => ({ ...prevState, login: value }))
            }
            onFocus={() => handleFocus('login')}
            onEndEditing={() => handleEndEditing('login')}
            placeholder="Login"
            placeholderTextColor="#BDBDBD"
            style={{
              ...styles.input,
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
            onFocus={() => handleFocus('email')}
            onEndEditing={() => handleEndEditing('email')}
            placeholder="E-mail"
            placeholderTextColor="#BDBDBD"
            style={{
              ...styles.input,
              marginBottom: 10,
              borderColor: isFocus.email ? '#FF6C00' : '#E8E8E8',
              backgroundColor: isFocus.email ? '#FFFFFF' : '#F6F6F6',
            }}
          />
          <View style={{ ...styles.wrapperInput, marginBottom: 43 }}>
            <TextInput
              value={user.password}
              onChangeText={value =>
                setUser(prevState => ({ ...prevState, password: value }))
              }
              onFocus={() => handleFocus('password')}
              onEndEditing={() => handleEndEditing('password')}
              placeholder="Password"
              placeholderTextColor="#BDBDBD"
              secureTextEntry={show ? false : true}
              style={{
                ...styles.input,
                borderColor: isFocus.password ? '#FF6C00' : '#E8E8E8',
                backgroundColor: isFocus.password ? '#FFFFFF' : '#F6F6F6',
              }}
            />
            <Text
              style={styles.buttonShowPassword}
              onPress={() => setShow(!show)}
            >
              {show ? 'Hide' : 'Show'}
            </Text>
          </View>
          <AuthButton onPress={handlerSubmit} text={'Registr'} />
          <Text style={styles.link}>Already have an account? Sign in</Text>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};
