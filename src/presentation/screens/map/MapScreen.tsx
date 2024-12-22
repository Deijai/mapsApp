import React, { useEffect } from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../../config/theme/global-styles';
import { MapUI } from '../../components/maps/MapUI';
import { useLocationStore } from '../../store/location/useLocationStore';
import { LoadingScreen } from '../loading/LoadingScreen';


export const MapScreen = () => {
  const { lastKnownLocation, getLocation } = useLocationStore();


  useEffect(() => {
    if(lastKnownLocation === null) {
      getLocation();
    }
  }, [])
  

  console.log('lastKnownLocation: ', lastKnownLocation);

  if(lastKnownLocation === null) {
    return (<LoadingScreen />)
  }
  
  
  return (
    <View style={globalStyles.container}>
   <MapUI initialLocation={lastKnownLocation} />
  </View>
  )
}
