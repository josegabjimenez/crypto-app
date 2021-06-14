import React from 'react';
import { Text, View, StyleSheet, Image, Pressable} from 'react-native';
let img = require('../assets/arrow_up.png');

//Colors
import Colors from '../res/Colors';

function CoinsCard({item, onPress}){

    const getImgPercent = () => {
        if(item.percent_change_1h > 0){
            return require("../assets/arrow_up.png");
        } else {
            return require("../assets/arrow_down.png");
        }
    }

    return (
        <Pressable style={style.container} onPress={onPress}>
            <View style={style.row}>
                <Text style={style.symbolText}>{item.symbol}</Text>
                <Text style={style.nameText}>{item.name}</Text>
                <Text style={style.priceText}>{`$${item.price_usd}`}</Text>
            </View>
            <View style={style.row}>
                <Text style={style.percentText}>{`$ ${item.percent_change_1h}`}</Text>
                <Image style={style.percentImage} source={getImgPercent()}/>
            </View>
        </Pressable>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 0.5,
        //marginLeft: Platform.OS == 'ios' ? 16 : 0,
    },
    row: {
        flexDirection: 'row',
    },
    symbolText: {
        color: Colors.white,
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 16,
    },
    nameText: {
        color: Colors.white,
        fontSize: 14,
        marginTop: 2,
        marginRight: 10
    },
    priceText: {
        color: Colors.dollar,
        fontSize: 14,
        marginTop: 2,
    },
    percentText: {
        color: Colors.white,
        marginRight: 10,
        marginTop: 4,
        fontSize: 12,
    },
    percentImage: {
        width: 16,
        height: 16,
        marginTop: 4
    }

    
})

export default CoinsCard;