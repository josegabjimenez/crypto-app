import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Colors
import Colors from '../../res/Colors';

const FavoritesEmptyScreen = () => {
    return (
        <View style={style.container}>
            <Text style={style.text}>You don't have any favorites yet. </Text>
        </View>
    )
}

export default FavoritesEmptyScreen

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.zircon,
        fontWeight: 'bold',
        fontSize: 16,
    }

})
