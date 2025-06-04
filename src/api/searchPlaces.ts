import axios from 'axios';

export const searchPlaces = async (query: string) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search`, {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1,
          limit: 5,
        },
        headers: {
          'User-Agent': 'YourAppName/1.0 (tonyghanna246@gmail.com)', 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
};
