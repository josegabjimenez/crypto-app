import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CoinDetailScreen(item) {

    const [coin, setCoin] = useState({});

    useEffect(() => {
        setCoin(item.route.params);
    }, []);

    return (
        <View style={style.container}>
            <Text style={style.coinTitle}>{coin.name}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coinTitle: {
        fontSize: 26,
        fontWeight: 'bold'
    }
})

export default CoinDetailScreen
