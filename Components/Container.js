import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Image,
  Dimensions,
  Alert,
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
        <Image
          source={require('../assets/image/photo_bg.png')}
          style={styles.imgBg}
        />
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  imgBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
