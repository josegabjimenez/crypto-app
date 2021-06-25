import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Loading from '../Loading';
import FavoritesEmptyScreen from './FavoritesEmptyScreen';
import CoinsSearcher from '../Coins/CoinsSearcher';
import CoinsCard from '../Coins/CoinsCard';
import Storage from '../../res/Storage';

//Http class
import Http from '../../lib/Http';

//Colors
import Colors from '../../res/Colors';

const FavoritesScreen = ({navigation}) => {

    const [favorites, setFavorites] = useState([]);
    const [allFavorites, setAllFavorites] = useState([]);
    const [areKeys, setAreKeys] = useState(false);
    const [queryResult, setQueryResult] = useState(true);
    const [cleanQuery, setCleanQuery] = useState(false);

    //Function to evaluate which coins in all the market you have added to the favorites section.
    const checkFavorites = async () => {
        const allKeys = await Storage.instance.getAllKeys();
        const keys = allKeys.filter((key) => {
            return key.includes("favorite-");
        })

        if(keys.length != 0) {
            setAreKeys(true);
        } else {
            setAreKeys(false);
        }

        const data = await Storage.instance.getAll(keys);

        const favoritesCoins = await Promise.all(data.map( async (item) => {
            return await getCoin(item);
        }));

        setFavorites(favoritesCoins);
        setAllFavorites(favoritesCoins);

    }

    //Make a fetch to get the coin specified.
    const getCoin = async (item) => {
        const res = await Http.instance.get(`https://api.coinlore.net/api/ticker/?id=${item[1]}`);
        return res[0];
    }

    //Search coins based on the query.
    const handleSearch = (query) => {
        const filteredCoins = allFavorites.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) || 
                coin.symbol.toLowerCase().includes(query.toLowerCase());
        })

        setFavorites(filteredCoins);
        if(filteredCoins.length == 0){
            setQueryResult(false);
        } else {
            setQueryResult(true);
        }

    }

    //Go to details of the chosen coin.
    const handlePress = (item) => {
        setCleanQuery(true);
        handleSearch("");
        navigation.navigate("FavoriteDetail", item);
    }

    //Clean search query
    const setQuery = () => {
        setCleanQuery(false);
    }

    useEffect(() => {

        if(queryResult){
            navigation.addListener("focus", () => checkFavorites());
            navigation.addListener("focus", () => setQuery());
        }

        return () => {
            if(queryResult){
                navigation.removeListener("focus", () => checkFavorites());
                navigation.removeListener("focus", () => setQuery());
            }
        }

    },[navigation]);

    return (
        <View style={style.container}>
            {(favorites.length == 0 && allFavorites.length == 0 ) ? areKeys ? <Loading/> : <FavoritesEmptyScreen /> : null }
            {allFavorites.length > 0 && (
                <View>
                    <CoinsSearcher onChange={handleSearch} clean={cleanQuery}/>
                    {favorites.length == 0 ? <Text style={style.notFoundText}>Not found</Text> 
                    :
                        <View style={style.favoritesContainer}>
                            <FlatList
                                data={favorites}
                                renderItem={({item}) => 
                                    <CoinsCard item={item} onPress={() => handlePress(item)} />
                                } 
                            />
                        </View>
                    }

                </View>
            )}

    

        </View>
    )
}

export default FavoritesScreen

const style = StyleSheet.create({
    container: {
        backgroundColor: Colors.blackPearl,
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    favoritesContainer: {
        backgroundColor: Colors.charade,
        borderWidth: 2,
        borderColor: Colors.carmine,
        padding: 12,
        borderRadius: 15,
        maxHeight: '90%'
    },
    notFoundText: {
        alignSelf: 'center',
        color: Colors.zircon,
        fontWeight: 'bold',
        fontSize: 16,
    }
})
