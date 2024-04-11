import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Wall from '../Container/Wall';
import Wallpap from '../Container/Wallpap';

export default function Routes() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Wall" component={Wall} />
      <Stack.Screen name="Wallpap" component={Wallpap} />
    </Stack.Navigator>
  );
}
