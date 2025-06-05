import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ButtonAnimationConfig {
  scaleDown?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
}

export const useButtonAnimation = ({
  scaleDown = 0.85,
  damping = 15,
  stiffness = 150,
  mass = 0.5
}: ButtonAnimationConfig = {}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(scaleDown, {
      damping,
      stiffness,
      mass
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping,
      stiffness,
      mass
    });
  };

  return {
    animatedStyle,
    handlePressIn,
    handlePressOut
  };
}; 