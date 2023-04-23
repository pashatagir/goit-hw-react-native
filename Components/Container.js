import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { fonts } from '../Screens/styles';

export const Container = ({ children }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  const [fontsLoaded] = useFonts({
    [fonts.roboto400]: require('../assets/fonts/Roboto-Regular.ttf'),
    [fonts.roboto500]: require('../assets/fonts/Roboto-Medium.ttf'),
    [fonts.roboto700]: require('../assets/fonts/Roboto-Bold.ttf'),
  });

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

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? -163 : -165}
        >
          {children}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
