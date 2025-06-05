import React from 'react';
import { Pressable } from 'react-native';
import { TrashIcon } from "../../../assets/icons/TrashIcon";
import { RightActionStyles as styles } from './RightAction.style';
import { RightActionProps } from './RightAction.type';
import Reanimated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export const RightAction: React.FC<RightActionProps> = ({ progress, onDelete }) => {

  const animatedStyle = useAnimatedStyle(() => {
    const scale = progress.value;
    return {
      transform: [
        { scale: withSpring(scale, { damping: 15 }) },
      ],
    };
  });

  return (
    <Reanimated.View style={[styles.container, animatedStyle]}>
      <Pressable
        style={[styles.deleteButton, { backgroundColor: '#ff4444' }]}
        onPress={onDelete}
      >
        <TrashIcon size={24} color="#fff" />
      </Pressable>
    </Reanimated.View>
  );
};

