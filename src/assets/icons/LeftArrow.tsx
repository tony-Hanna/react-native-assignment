import { TouchableOpacity } from 'react-native';
import Svg, {Path} from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../store/themeContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/stacks/types';


type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const ArrowLeftIcon = () => {
    const {theme} = useTheme()
    const navigation = useNavigation<NavigationProp>();
    const handleBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate('MainTabs'); // Fallback to Home tab by navigating to MainTabs
        }
      };
    return (
    <TouchableOpacity onPress={handleBackPress}>
        <Svg viewBox="0 0 24 24" fill={theme.text} width={24} height={24}  style={{ padding: 16}}>
            <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
            />
        </Svg>
    </TouchableOpacity>
);
}
export default ArrowLeftIcon;
