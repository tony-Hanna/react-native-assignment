import {fontFamilies} from '../constants/fonts';

export const getFontFamily = (
  isLTR: boolean,
  weight: 'normal' | 'medium' | 'bold',
) => {
  const selectedFontFamily = fontFamilies.Roboto
  return selectedFontFamily[weight];
};