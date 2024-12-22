import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { globalStyles } from '../../../config/theme/global-styles';
import { usePermissionStore } from '../../store/permission/usePermissionStore';

export const PermissionScreen = () => {
  const { locationStatus, requestLocationPermission } = usePermissionStore();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Habilitar localização</Text>
        <View style={{ height: 40 }}></View>

        <Pressable style={({pressed}) => [
            {
              opacity: pressed ? 0.7 : 1,
            },
            globalStyles.btnPrimary
          ]}

          onPress={requestLocationPermission}
          
          >
          <Text style={{color: 'white'}}>Habilitar localização</Text>
        </Pressable>

        <View style={{ height: 40 }}></View>

        <Text>Estado atual: { locationStatus }</Text>
    </View>
  )
}
