import { View, Dimensions } from "react-native"
import Skeleton from "react-native-reanimated-skeleton";
import { useTheme } from "../../store/themeContext";
import { normalizeWidth, normalizeHeight } from "../../utils/scale";
import LinearGradient from "react-native-linear-gradient";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
import ArrowLeftIcon from "../../assets/icons/LeftArrow";
export const DetailsSkeleton = () => {
    const {isDark,theme} = useTheme()
    return (
        <LinearGradient colors={theme.gradient} style={{flex:1}}>
        <View style={{flex: 1, padding: normalizeWidth(20)}}>
            <View style={{paddingVertical:normalizeHeight(10)}}>
                <ArrowLeftIcon />
            </View>
            <Skeleton
                isLoading={true}
                containerStyle={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
                    flex: 1,
                }}
                layout={[
                    {
                        width: SCREEN_WIDTH - normalizeWidth(40),
                        height: SCREEN_WIDTH - normalizeWidth(40),
                        marginBottom: normalizeHeight(20),
                        borderRadius: 12,
                    },
                    {
                        width: '80%',
                        height: normalizeHeight(30),
                        marginBottom: normalizeHeight(5),
                    },
                    {
                        width: '40%',
                        height: normalizeHeight(25),
                        marginBottom: normalizeHeight(15),
                    },
                    {
                        width: '30%',
                        height: normalizeHeight(22),
                        marginBottom: normalizeHeight(5),
                    },
                    {
                        width: '100%',
                        height: normalizeHeight(20),
                        marginBottom: normalizeHeight(10),
                    },
                    {
                        width: '30%',
                        height: normalizeHeight(22),
                        marginBottom: normalizeHeight(5),
                    },
                    {
                        width: '60%',
                        height: normalizeHeight(20),
                        marginBottom: normalizeHeight(30),
                    },
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        children: [
                            {
                                width: '48%',
                                height: normalizeHeight(45),
                                borderRadius: 8,
                            },
                            {
                                width: '48%',
                                height: normalizeHeight(45),
                                borderRadius: 8,
                            }
                        ],
                        
                    },
                    {
                        width: '100%',
                        marginTop:10,
                        height: normalizeHeight(45),
                        borderRadius: 8,
                    }
                ]}
            />
        </View>
        </LinearGradient>
    )
}