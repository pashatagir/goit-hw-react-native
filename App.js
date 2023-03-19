import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  ImageBackground,
  Text,
} from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nameHandler = text => setName(text);
  const emailHandler = text => setEmail(text);
  const passwordHandler = text => setPassword(text);
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  const onLogin = () => {
    Alert.alert('Credentials', `${name} + ${password}`);
  };

  const onShow = () => {
    console.log(password);
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('./assets/image/photo_bg.png')}
        resizeMode="stretch"
        style={styles.imageBg}
      >
        <View style={styles.container}>
          <View style={styles.avatar} />
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <Text style={styles.title}>Registration</Text>
            <TextInput
              value={name}
              onChangeText={nameHandler}
              placeholder="Login"
              style={styles.input}
            />
            <TextInput
              value={email}
              onChangeText={emailHandler}
              placeholder="E-mail"
              secureTextEntry={true}
              style={styles.input}
            />
            <TextInput
              value={password}
              onChangeText={passwordHandler}
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
            />
            <Button title={'Show'} onPress={onShow} />
            <Button title={'Login'} onPress={onLogin} style={styles.button} />
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginTop: 263,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    color: '#212121',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    marginTop: 92,
    marginBottom: 32,
  },
  avatar: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: -60,
    left: '50%',
    transform: 'translateX(-50px)',
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  input: {
    width: 'auto',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    border: '1px solid #E8E8E8',
    marginBottom: 10,
    backgroundColor: '#F6F6F6',
    color: '#BDBDBD',
  },
  imageBg: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: 36,
    borderRadius: 8,
    color: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
