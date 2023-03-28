import { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AuthButton } from '../Components/Button';
import { Container } from '../Components/Container';
import { styles } from './styles';

const initialStateUser = {
  email: '',
  password: '',
};

const initialStateFocus = {
  email: false,
  password: false,
};

export const LoginScreen = () => {
  console.log(Platform.OS);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(initialStateUser);
  const [isFocus, setIsFocus] = useState(initialStateFocus);

  const handlerSubmit = () => {
    Alert.alert(JSON.stringify(user));
    console.log(user);
    setUser(initialStateUser);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? -220 : -59}
      >
        <View style={{ ...styles.form, paddingBottom: 129 }}>
          <Text style={{ ...styles.title, marginTop: 32 }}>Sign in</Text>
          <TextInput
            value={user.email}
            onChangeText={value =>
              setUser(prevState => ({ ...prevState, email: value }))
            }
            onFocus={() =>
              setIsFocus(prevState => ({
                ...prevState,
                email: true,
              }))
            }
            onEndEditing={() =>
              setIsFocus(prevState => ({ ...prevState, email: false }))
            }
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
              onFocus={() =>
                setIsFocus(prevState => ({
                  ...prevState,
                  password: true,
                }))
              }
              onEndEditing={() =>
                setIsFocus(prevState => ({ ...prevState, password: false }))
              }
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
          <AuthButton onPress={handlerSubmit} text={'Sign in'} />
          <Text style={styles.link}>I don't have an account! Sign up now</Text>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};
