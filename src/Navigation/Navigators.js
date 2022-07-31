import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from '../Screens/Homescreen';
import Createsqad from '../Screens/Createsqad';
import {Text, TouchableOpacity} from 'react-native';
import Makesquad from '../Screens/Makesquad';
import Captionselection from '../Screens/Captionselection';

const Stack = createNativeStackNavigator();

const Navigators = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Homescreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Createsqad"
        component={Createsqad}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Makesquad"
        component={Makesquad}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Captionselection"
        component={Captionselection}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigators;
