import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

//Colors 
import Colors from '../../res/Colors';

const CoinDetailMarketItem = ({item}) => {
    return (
        <View style={style.itemContainer}>
            <Text style={style.itemText}>{item.name}</Text>
            <Text style={style.itemPrice}>{item.price_usd}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    itemContainer: {
        padding: 18,
        width: 100,
        backgroundColor: Colors.charade,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        //borderColor: Colors.zircon,
        //borderWidth: 1,
    },
    itemText: {
        color: Colors.zircon,
        fontWeight: 'bold'
    },
    itemPrice: {
        color: Colors.zircon,
    },
})

export default CoinDetailMarketItem
