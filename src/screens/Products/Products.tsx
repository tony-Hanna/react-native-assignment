import { View, Text, FlatList, Pressable, StatusBar, ActivityIndicator } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "../../store/themeContext"
import { createStyles } from "./Products.style"
import { productProp } from "../../components/organisms/Product/Product.type"
import {Product} from '../../components/organisms/Product/Product'
import LinearGradient from "react-native-linear-gradient"
import { Logo } from "../../assets/icons/Logo"
import { CustomText } from "../../components/atoms/CustomText/CustomText"
import { MoonIcon } from "../../assets/icons/moon"
import { SunIcon } from "../../assets/icons/sun"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getProducts } from "../../api/getProducts"

const Products = () => {
    const insets = useSafeAreaInsets()
    const {isDark, theme, toggleTheme} = useTheme()
    const styles = createStyles(theme, isDark)

    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isRefetching,
    } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({ pageParam }) => getProducts({ pageParam: pageParam as number }),
        getNextPageParam: (lastPage) => {
            if (lastPage?.data?.pagination?.hasNextPage) {
                return lastPage.data.pagination.currentPage + 1;
            } 
            return undefined;
        },
        initialPageParam: 0,

        select: (data) => data.pages.flatMap(page => page.data)
    })
    console.log('products', data)
    
    const renderItem = ({item} : {item: productProp}) => <Product item={item}/>

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <CustomText>Error loading products: {error.message}</CustomText>
            </View>
        );
    }

    return (
        <LinearGradient
            colors={theme.gradient} 
          >    
        <StatusBar 
              barStyle={isDark ? 'light-content' : 'dark-content'}
              backgroundColor="transparent"
              translucent
            />
 
        <View style={{paddingTop : insets.top, paddingBottom: insets.bottom}}>
            <View style={styles.header}>
                <View style={styles.logo}>
                    <Logo 
                        w={40}
                        h={40}
                    />
                    <CustomText style={{fontSize:20}}>Products</CustomText>
                </View>

            <Pressable style={styles.toggleButton} onPress={toggleTheme}>
                <Text style={styles.toggleText}>{isDark ? <SunIcon /> : <MoonIcon />}</Text>
            </Pressable>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.flatlist} 
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => 
                    isFetchingNextPage ? (
                        <ActivityIndicator size="small"/>
                    ) : null
                }
                refreshing={isRefetching}
                onRefresh={refetch}
            />
        </View>
        </LinearGradient>
    )
}

export {Products}