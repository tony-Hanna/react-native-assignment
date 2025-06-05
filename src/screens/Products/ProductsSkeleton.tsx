import { View } from "react-native"
import Skeleton from "react-native-reanimated-skeleton";
import { useTheme } from "../../store/themeContext";
export const ProductSkeleton = () => {
    const {isDark} = useTheme()
    return (
        <View style={{paddingBottom: 10}}>
                    {[1, 2, 3].map((key) => (
                    <Skeleton
                        key={key}
                        isLoading={true}
                        containerStyle={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
                        padding: 15,
                        margin: 15,
                        borderRadius: 8,
                        }}
                        layout={[
                            {
                            key: 'productCard',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            height:150,
                            children: [
                                {
                                key: 'titleSkeleton',
                                width: '45%',
                                height: 20,
                                marginBottom: 6,
                                borderRadius: 4,
                                alignSelf:'center'
                                },
                                {
                                key: 'imageSkeleton',
                                width:150,
                                height: 120,
                                borderRadius: 10,
                                },
                            ],
                            },
                            {
                            key: 'priceSkeleton',
                            width: '30%',
                            height: 18,
                            marginTop: 10,
                            marginBottom: 6,
                            borderRadius: 4,
                            },
                            {
                            key: 'descriptionSkeleton',
                            width: '100%',
                            height: 14,
                            borderRadius: 4,
                            },
                        ]}
                    />
                    ))}
                </View>
    )
}