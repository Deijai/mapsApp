// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { StackNavigator } from './src/presentation/navigator/StackNavigator';
import { PermissionChecker } from './src/presentation/providers/PermissionChecker';

export const App = () => {
  return (
    <NavigationContainer>
      <PermissionChecker>
        <StackNavigator />
      </PermissionChecker>
    </NavigationContainer>
  )
}
