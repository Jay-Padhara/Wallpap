import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './Src/Navigation/Routes';
import SplashScreen from 'react-native-splash-screen';

export default function App() {

  useEffect(() => {
    setTimeout(() => {
    SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}