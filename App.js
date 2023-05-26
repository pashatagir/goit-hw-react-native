import {} from 'react-native';
import React, { useState } from 'react';
import { Routing } from './router';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

export default App;
