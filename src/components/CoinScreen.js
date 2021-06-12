import React, { useState, useEffect } from 'react'
import { View, Text, Button, Pressable, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import Http from '../lib/Http';
import CoinsCard from './CoinsCard';

//CustomHooks
import useCoins from '../hooks/useCoins'
//Colors
import Colors from '../res/Colors';

function CoinScreen({navigation}) {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');
            setCoins(res.data);
            setLoading(false);
        }
        getData();
    },[]);



    const handlePress = () => {
        //console.log("The button was pressed", navigation);
        navigation.navigate("CoinDetail");
    }

    console.log(coins);

    return (
        
        <View style={style.container}>
            {
                loading ? <ActivityIndicator color="#fff" size="large" style={style.loader} /> : null
            }
            <Pressable onTouchMove={handlePress}>

            </Pressable>
            <FlatList
                data={coins}
                renderItem={({item}) => 
                    <CoinsCard item={item}/>
                }
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    btn: {
        backgroundColor: 'red',
        color: 'gray'
    },
    text: {
        margin: 10,
        fontSize: 30
    },
    loader: {
        marginTop: '75%'
    }

});

export default CoinScreen
