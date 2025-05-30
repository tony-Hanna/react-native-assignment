import { View, StyleSheet, Platform, PermissionsAndroid, Alert, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import MapView, { Marker, Region, MapPressEvent } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocationStore } from '../../store/LocationStore';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CustomText } from '../../components/atoms/CustomText/CustomText';
import SearchBar from '../../components/organisms/searchPlaces/SearchPlaces';
import ArrowLeftIcon from '../../assets/icons/LeftArrow'
import { MainStackParamList } from '../../navigation/stacks/types';

export const Location = () => {
    const { location, setLocation } = useLocationStore();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets()
    const route = useRoute<RouteProp<MainStackParamList, 'Location'>>()
    const {longitude, latitude, fromProductDetails} = route.params || {}
    console.log('fromProductDetails', longitude, latitude)
    const defaultLocation: Region = {
      latitude: latitude ?? 37.78825,
      longitude: longitude ?? -122.4324,
      longitudeDelta: 0.0421,
      latitudeDelta: 0.0922,
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      });
    };

    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('granted');
            getCurrentLocation();
          } else {
            Alert.alert(
              'Permission Denied',
              'Location permission is required to show your current location on the map.',
            );
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        // iOS permission handling goes here
        getCurrentLocation();
      }
    };

    // Handle user taps on map
    const handleMapPress = (event: MapPressEvent) => {
      const { coordinate } = event.nativeEvent;
      setLocation({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

  useEffect(() => {
  if (!fromProductDetails) {
    requestLocationPermission();
  } else {
    setLocation({
      latitude: latitude ?? 37.78825,
      longitude: longitude ?? -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }
}, []);

  const handleSelectPlace = (place: any) => {
    setLocation({
      latitude: Number(place.lat),
      longitude: Number(place.lon),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
  return (
    <View style={[StyleSheet.absoluteFill, { marginTop: insets.top, marginBottom: 20 }]}>
      <View style={{ marginLeft:15}}>
        <ArrowLeftIcon />
      </View>
        <SearchBar onSelect={handleSelectPlace} />
        <MapView
          style={{ width: '100%', flex: 1 }}
          region={location || defaultLocation}
          onPress={handleMapPress}
          showsUserLocation={true}
        >
          <Marker
            coordinate={location || defaultLocation}
            title="Selected Location"
            description="Tap on the map to change this location"
          />
        </MapView>
        {!fromProductDetails && 
        <Pressable
            onPress={() => {
              console.log('location from location screen', location);
              navigation.goBack();
            }}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#e53935' : '#f44336',
              paddingVertical: 14,
              paddingHorizontal: 24,
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 8,
              alignItems: 'center',
              marginTop: 20,
              marginHorizontal: 16,
            })}
          >
            
            <CustomText style={{ color: '#fff', fontSize: 16, fontWeight: '600'}}>
              Confirm Location
            </CustomText>
          </Pressable>
        }
    </View>
  );
};
