import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { NavConfigs, NavRoutes } from './index';
import { useLocalStorage } from '../Hooks';
import {
  BarcodeInput,
  Login,
  PhotoUpload,
  ScanBarcode,
  TakePhoto,
} from '../Screens';

const Stack = createStackNavigator();

const Routes = () => {
  const { localdata } = useLocalStorage();

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 200);
  }, []);

  const Screens = useCallback(() => {
    return (
      <Stack.Navigator
        initialRouteName={
          localdata?.User ? NavRoutes.BarcodeInput : NavRoutes.Login
        }
        screenOptions={NavConfigs.screenOptions}>
        <Stack.Screen name={NavRoutes.Login} component={Login} />
        <Stack.Screen name={NavRoutes.BarcodeInput} component={BarcodeInput} />
        <Stack.Screen name={NavRoutes.ScanBarcode} component={ScanBarcode} />
        <Stack.Screen name={NavRoutes.PhotoUpload} component={PhotoUpload} />
        <Stack.Screen name={NavRoutes.TakePhoto} component={TakePhoto} />
      </Stack.Navigator>
    );
  }, [localdata?.User]);

  return (
    <NavigationContainer>
      <Screens />
    </NavigationContainer>
  );
};

export default Routes;
