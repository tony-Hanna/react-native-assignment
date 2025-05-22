import { View, StyleSheet, Platform, PermissionsAndroid, Alert, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Region, MapPressEvent } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useLocationStore } from '../../store/LocationStore';
import { useNavigation } from '@react-navigation/native';
import { CustomText } from '../../components/atoms/CustomText/CustomText';
export const Location = () => {
    const { location, setLocation } = useLocationStore();
    const navigation = useNavigation();
  const defaultLocation: Region = {
    latitude: 37.78825,
    longitude: -122.4324,
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
    requestLocationPermission();
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
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
      <Pressable onPress={() => {
            console.log('location from location screen', location)
            navigation.goBack()
        }}>
            <CustomText style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>Confirm Location</CustomText>
        </Pressable>
    </View>
  );
};
