import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { PermissionScreen } from '../screens/permission/PermissionScreen';
import { MapScreen } from '../screens/map/MapScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';

export type RootStackParams = {
  LoadingScreen: undefined;
  MapScreen: undefined;
  PermissionScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
        //initialRouteName='LoadingScreen'
         screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white'
          }
        }}>
           <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
        </Stack.Navigator>
      );
}
