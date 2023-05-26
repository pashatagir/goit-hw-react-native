import {} from 'react-native';
import React, { useState } from 'react';
import { Router } from './Router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useFonts } from 'expo-font';
import { fonts } from './assets/fonts/fonts';
import * as SplashScreen from 'expo-splash-screen';

const App = () => {
  const [fontsLoaded] = useFonts({
    [fonts.roboto400]: require('./assets/fonts/Roboto-Regular.ttf'),
    [fonts.roboto500]: require('./assets/fonts/Roboto-Medium.ttf'),
    [fonts.roboto700]: require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
