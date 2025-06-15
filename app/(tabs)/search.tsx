import {View, Image, FlatList, ActivityIndicator, Text} from 'react-native'
import {images} from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useEffect, useState} from "react";
import {updateSearchCount} from "@/services/appwrite";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("")

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: loadMovies,
        reset,
    } = useFetch(() => fetchMovies({query: searchQuery}), false
    )

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset()
            }
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [searchQuery])

    useEffect(() => {
        if (movies?.length > 0 && movies?.[0]) {
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies])


    return (
        <View className='flex-1 bg-primary'>
            <Image className="w-full z-0 flex-1 absolute" source={images.bg} resizeMode="cover"/>
            <FlatList data={movies}
                      keyExtractor={(item) => item.id}
                      renderItem={({item}) => (
                          <MovieCard {...item}/>
                      )}
                      className="px-5"
                      numColumns={3}
                      columnWrapperStyle={{
                          justifyContent: 'center',
                          gap: 16,
                          marginVertical: 16,

                      }}
                      contentContainerStyle={{paddingBottom: 100}}
                      ListHeaderComponent={
                          <>
                              <View className="w-full justify-center mt-20 items-center">
                                  <Image source={icons.logo} className="w-12 h-10"/>
                              </View>
                              <View className="my-5">
                                  <SearchBar placeholder="Search movies..."
                                             value={searchQuery}
                                             onChangeText={(text: string) => setSearchQuery(text)}
                                  />
                              </View>

                              {moviesLoading && (
                                  <ActivityIndicator size="large" color='#0000ff' className="my-3"/>
                              )}

                              {moviesError && (
                                  <Text className="text-red-500 px-5 my-3">
                                      Error: {moviesError.message}
                                  </Text>
                              )}

                              {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                                  <Text className="text-xl text-w font-bold text-white">
                                      Search Results for{' '}
                                      <Text className="text-accent">{searchQuery}</Text>
                                  </Text>
                              )

                              }
                          </>
                      }
                      ListEmptyComponent={
                          !moviesLoading && !moviesError ? (
                              <View className="mt-10  px-5">
                                  <Text className="text-center text-gray-500">
                                      {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                                  </Text>
                              </View>
                          ) : null
                      }
            />
        </View>
    )
}

export default Search