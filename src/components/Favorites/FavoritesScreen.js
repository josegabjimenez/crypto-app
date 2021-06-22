import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FavoritesEmptyScreen from './FavoritesEmptyScreen';

//Colors
import Colors from '../../res/Colors';

const FavoritesScreen = () => {
    return (
        <View style={style.container}>
            <FavoritesEmptyScreen />
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
