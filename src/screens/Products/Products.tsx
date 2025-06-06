import { View, Text, FlatList, Pressable, StatusBar, ActivityIndicator, TextInput } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "../../store/themeContext"
import { createStyles } from "./Products.style"
import { productProp } from "../../components/organisms/Product/Product.type"
import {Product} from '../../components/organisms/Product/Product'
import LinearGradient from "react-native-linear-gradient"
import { CustomText } from "../../components/atoms/CustomText/CustomText"
import { MoonIcon, SunIcon, Logo } from "../../assets/icons"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getProducts } from "../../api/getProducts"
import { useMemo, useState } from "react"
import { useDebounce } from "../../hooks/Debounce"
import { ProductSkeleton } from "./ProductsSkeleton"
import { Refetch } from "../../components/organisms/Refetch/Refetch"
const Products = () => {
    const insets = useSafeAreaInsets()
    const {isDark, theme, toggleTheme} = useTheme()
    const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined)

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
        queryKey: ['products', sortOrder, debouncedSearch],
        queryFn: ({ pageParam }) => getProducts({ 
            pageParam: pageParam as number,
            sortOrder,
            searchTerm: debouncedSearch
        }),
        getNextPageParam: (lastPage) => {
            if (lastPage?.pagination?.hasNextPage) {
                return lastPage.pagination.currentPage + 1;
            } 
            return undefined;
        },
        initialPageParam: 1,
        select: (data) => ({
            products: data.pages.flatMap(page => page.data),
            pagination: data.pages[data.pages.length - 1]?.pagination
        })
    })

    const toggleSort = () => {
        setSortOrder(current => {
            if (current === undefined) return 'asc';
            if (current === 'asc') return 'desc';
            return undefined;
        });
    };

    const renderItem = ({item} : {item: productProp}) => <Product title={item.title} price={item.price} description={item.description} images={item.images} updatedAt={item.updatedAt} _id={item._id}/>

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };
    if (error) {
        return <Refetch message={error.message} refetch={refetch} isProducts={true}/>
    }

    return (
        <LinearGradient
            colors={theme.gradient} 
            style={{flex:1}}
        >    
            <StatusBar 
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor="transparent"
                translucent
            />
 
            <View style={{paddingTop : insets.top, paddingBottom: 25}}>
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

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search products..."
                        placeholderTextColor={isDark ? '#666' : '#999'}
                        value={searchTerm}
                        onChangeText={text => setSearchTerm(text)}
                    />
                    <Pressable 
                        style={styles.sortButton} 
                        onPress={toggleSort}
                    >
                        <CustomText style={styles.sortButtonText}>
                            {sortOrder === 'asc' ? '↑ Price' : 
                             sortOrder === 'desc' ? '↓ Price' : 
                             'Sort Price'}
                        </CustomText>
                    </Pressable>
                </View>
                {isLoading  ? 
                    <ProductSkeleton />
                 : (
                <FlatList
                    data={data?.products}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.flatlist}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() =>
                    isFetchingNextPage ? <ActivityIndicator size="small" /> : null
                    }
                    refreshing={isRefetching}
                    onRefresh={refetch}
                />
                )}


            </View>
        </LinearGradient>
    )
}

export {Products}