import axios from 'axios';

export const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/reverse',
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
        },
        headers: {
          'User-Agent': 'MyReactNativeApp/1.0 (tonyghanna246@gmail.com)', 
        },
      }
    );
    return response.data || 'Address not found';
  } catch (error) {
    console.error('Error fetching address:', error);
    return 'Error fetching address';
  }
};
