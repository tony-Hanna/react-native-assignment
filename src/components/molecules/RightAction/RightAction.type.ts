import { SharedValue } from "react-native-reanimated";
export interface RightActionProps {
    progress: SharedValue<number>;
    dragX: SharedValue<number>;
    onDelete: () => void;
  }