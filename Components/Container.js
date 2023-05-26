import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export const Container = ({ children }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window.width);
    });
    return () => subscription?.remove();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          width: dimensions,
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? -163 : -165}
        >
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
