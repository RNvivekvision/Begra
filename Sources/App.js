import React from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-native-toast-notifications';
import { Routes } from './Navigation';
import { Store } from './Redux';

const App = () => {
  return (
    <Provider store={Store}>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </Provider>
  );
};

export default App;
