import { normalizeWidth } from "../../../utils/scale";
import { StyleSheet } from "react-native";
export const RightActionStyles = StyleSheet.create({
    container: {
      width: normalizeWidth(80),
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteButton: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });