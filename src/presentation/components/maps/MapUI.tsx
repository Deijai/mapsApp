import React, { useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { globalStyles } from '../../../config/theme/global-styles';
import { Location } from '../../../infrastructure/interfaces/location';
import { Fab } from './ui/Fab';
import { useLocationStore } from '../../store/location/useLocationStore';

interface Props {
  showsUserLocation?: boolean;
  initialLocation: Location
}


export const MapUI = ({ showsUserLocation = true, initialLocation }: Props) => {

  const mapRef = useRef<MapView>()
  const cameraLocation = useRef<Location>(initialLocation);
  const [isFollowingUser, setIsFollowingUser] = useState(true)
  const [isShowingPolyline, setIsShowingPolyline] = useState(true)

  const { getLocation, lastKnownLocation, watchLocation, clearWatchLocation, userLocationList } = useLocationStore();

  const moveCameraToLocation = (location: Location) => {
    if (!mapRef.current) return;
    mapRef.current.animateCamera({
      center: location,
      //zoom: 15
    })

  }

  const moveToCurrentLocation = async () => {
    if (!lastKnownLocation) {
      moveCameraToLocation(initialLocation)
    }
    const location = await getLocation();
    if (!location) return;
    moveCameraToLocation(location);
  }

  useEffect(() => {
    watchLocation()
    return () => {
      clearWatchLocation();
    }
  }, [])

  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      moveCameraToLocation(lastKnownLocation);
    }
  }, [lastKnownLocation])

  return (
    <>
      <MapView
        ref={(map) => mapRef.current = map!}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
        style={globalStyles.map}
        showsUserLocation={showsUserLocation}
        onTouchStart={ () => setIsFollowingUser(false) }
        region={{
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >

        {isShowingPolyline && (
           <Polyline
           coordinates={userLocationList}
           strokeColor='black'
           strokeWidth={5}
          />
        )}

       

        {/* 

        latitude: -3.54226,
          longitude: -45.6052,
        
        <Marker 
         title='Titulo do marcador'
         description='Descrição do marcador'
         image={require('../../../assets/marker.png')}
         style={{

         }}
         coordinate={{ latitude: 37.78825, longitude: -122.4324 }} /> */}


      </MapView>

      <Fab
        onPress={() => setIsShowingPolyline(!isShowingPolyline)}
        icon={ isShowingPolyline ? 'eye-outline' : 'eye-off-outline' } style={{ bottom: 140, right: 10 }}
      />


      <Fab
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        icon={ isFollowingUser ? 'walk-outline' : 'accessibility-outline' } style={{ bottom: 80, right: 10 }}
      />

<Fab
        onPress={moveToCurrentLocation}
        icon={'compass-outline'} style={{ bottom: 15, right: 10 }}
      />
    </>
  )
}
