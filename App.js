/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigators from './src/Navigation/Navigators';
import ContextProvider from './src/Context';
const App = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Navigators />
      </NavigationContainer>
    </ContextProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
