import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
const scaleHeight = SCREEN_HEIGHT / BASE_HEIGHT;

export const normalizeWidth = (size: number): number => {
  const newSize = size * scaleWidth;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const normalizeHeight = (size: number): number => {
  const newSize = size * scaleHeight;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
