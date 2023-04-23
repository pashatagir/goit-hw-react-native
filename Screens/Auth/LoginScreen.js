import { useState } from 'react';
import { Text, TextInput, View, ImageBackground } from 'react-native';
import { MainButton } from '../../Components/Buttons';
import { Container } from '../../Components/Container';
import { styles } from '../styles';

const initialStateUser = {
  email: '',
  password: '',
};

const initialStateFocus = {
  email: false,
  password: false,
};

export const LoginScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(initialStateUser);
  const [isFocus, setIsFocus] = useState(initialStateFocus);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

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
    setUser(initialStateUser);
    navigation.navigate('Home', {
      screen: 'Posts',
      user,
    });
  };

  return (
    <Container>
      <ImageBackground
        source={require('../../assets/image/photo_bg.png')}
        style={styles.imgBg}
      >
        <View
          style={{ ...styles.form, paddingBottom: isShowKeyboard ? 79 : 129 }}
        >
          <Text style={{ ...styles.title, marginTop: 32 }}>Sign in</Text>
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
              onFocus={() => handlerFocus('password')}
              onEndEditing={() => handlerEndEditing('password')}
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
          {!isShowKeyboard && (
            <>
              <MainButton onPress={handlerSubmit} text={'Sign in'} />
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Registration')}
              >
                I don't have an account! Sign up now
              </Text>
            </>
          )}
        </View>
      </ImageBackground>
    </Container>
  );
};
