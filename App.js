/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import SignupScreen from './src/SignupScreen'
import SigninScreen from './src/SigninScreen'
import LoadingScreen from './src/LoadingScreen'
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { setNavigator } from './src/navigationRef'
import Backer from './src/Backer'
import AccoutScreen from './src/AccountScreen';
import BackerDetail from './src/BackerDetail'

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }),
  mainFlow: createBottomTabNavigator({
    backerFlow: createStackNavigator({
      Deals: Backer,
      Details: BackerDetail
    }),
    Account: AccoutScreen,
  })
})

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }} />
    </AuthProvider>
  )
}
