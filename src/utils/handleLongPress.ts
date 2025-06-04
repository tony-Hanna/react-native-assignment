import { Platform } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-toast-message';

export const saveImage = async (imageUrl: string) => {
  try {
    const { config, fs } = RNBlobUtil;
    const date = new Date();
    const fileName = `image_${Math.floor(date.getTime() + date.getSeconds() / 2)}.jpg`;
    
    // Platform specific paths
    const path = Platform.select({
      ios: `${fs.dirs.DocumentDir}/${fileName}`,
      android: `${fs.dirs.DownloadDir}/${fileName}`,
    }) || `${fs.dirs.DownloadDir}/${fileName}`; // Fallback to Android path

    const options = Platform.select({
      ios: {
        fileCache: true,
        appendExt: 'jpg',
        path: path,
      },
      android: {
        fileCache: true,
        appendExt: 'jpg',
        path: path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Image',
          mime: 'image/jpeg',
        },
      },
    }) || {
      fileCache: true,
      appendExt: 'jpg',
      path: path,
    }; 

    await config(options).fetch('GET', imageUrl);
    Toast.show({
      type: 'success',
      text1: 'image downloaded successfully',
    });
  } catch (err) {
    console.error('Error saving image:', err);
    Toast.show({
      type: 'error',
      text1: 'error downloading image'
    });
  }
};

