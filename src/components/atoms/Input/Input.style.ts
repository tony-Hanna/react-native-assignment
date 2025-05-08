// import { StyleSheet } from "react-native";
// import { Theme } from "../../../store/themeContext";
// export const inputStyles = (theme: Theme) => 
//     StyleSheet.create({
//     input: {
//         backgroundColor: 'rgba(255, 255, 255, 0.25)',
//         padding: 14,
//         borderRadius: 10,
//         marginBottom: 12,
//         color: 'white',
//         fontSize: 16,
//         borderWidth: 1,
//         borderColor: 'rgba(255, 255, 255, 0.3)',
//         elevation: 0.5,
//         fontFamily:'Roboto-Regular'
//     }
// });
import { StyleSheet } from "react-native";
import { Theme } from "../../../store/themeContext";
import { normalizeWidth, normalizeHeight } from "../../../utils/scale";

export const inputStyles = (theme: Theme) => 
  StyleSheet.create({
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      padding: normalizeWidth(14),
      borderRadius: normalizeWidth(10),
      marginBottom: normalizeHeight(12),
      color: 'white',
      fontSize: normalizeWidth(16),
      borderWidth: normalizeWidth(1),
      borderColor: 'rgba(255, 255, 255, 0.3)',
      elevation: 0.5,
      fontFamily: 'Roboto-Regular',
    }
  });
