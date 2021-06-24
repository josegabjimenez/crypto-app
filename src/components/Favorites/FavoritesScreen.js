import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import FavoritesEmptyScreen from './FavoritesEmptyScreen';
import CoinsCard from '../Coins/CoinsCard';
import Storage from '../../res/Storage';

//Colors
import Colors from '../../res/Colors';

const FavoritesScreen = ({navigation}) => {

    const [favorites, setFavorites] = useState([]);

    const checkFavorites = async () => {
        setFavorites([]);
        const allKeys = await Storage.instance.getAllKeys();
        const keys = allKeys.filter((key) => {
            return key.includes("favorite-");
        })
        const data = await Storage.instance.getAll(keys);

        const favorites = data.map((item) => {
            return JSON.parse(item[1]);
        })

        setFavorites(favorites);

    }

    const handlePress = (item) => {
        console.log("The button was pressed");
        navigation.navigate("CoinDetail", item);
    }

    console.log(favorites);

    useEffect(() => {
        checkFavorites();

        navigation.addListener("focus", () => checkFavorites());

        return () => {
            navigation.removeListener("focus", () => checkFavorites());
        }

    },[navigation]);

    return (
        <View style={style.container}>
            {favorites.length == 0 ? <FavoritesEmptyScreen /> : null}
            {console.log(favorites.length)}
            {favorites.length > 0 ?
                <FlatList
                    data={favorites}
                    renderItem={({item}) => 
                        <CoinsCard item={item} onPress={() => handlePress(item)} />

                } />
                : null
            }

        </View>
    )
}

export default FavoritesScreen

const style = StyleSheet.create({
    container: {
        backgroundColor: Colors.blackPearl,
        flex: 1,
    }
})
