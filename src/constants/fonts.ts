import {isIOS} from '../utils/platformUtil';

export const fontFamilies = {
  Roboto: {
    normal: isIOS() ? 'Montserrat-Regular' : 'MontserratRegular',
    medium: isIOS() ? 'Roboto-Medium' : 'RobotoMedium',
    bold: isIOS() ? 'Montserrat-Bold' : 'MontserratBold',
  }
  // Adjust the above code to fit your chosen fonts' names
};
