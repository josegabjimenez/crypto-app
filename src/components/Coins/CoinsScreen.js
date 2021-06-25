import React, { useState, useEffect } from 'react'
import { View, Text, Platform, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import Http from '../../lib/Http'
import CoinsCard from './CoinsCard';
import CoinsSearcher from './CoinsSearcher';

//Colors
import Colors from '../../res/Colors';

function CoinsScreen({navigation}) {

    //State of the component
    const [coins, setCoins] = useState([]);
    const [allCoins, setAllCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    //Method to make a fetch of all the coins.
    const getData = async () => {
        setLoading(true);
        const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');
        setCoins(res.data);
        setAllCoins(res.data);
        setLoading(false);
    }

    //Navigate to CoinDetail screen.
    const handlePress = (item) => {
        navigation.navigate("CoinDetail", item);
    }

    //Method to filter the coins by the query (Search coins).
    const handleSearch = (query) => {

        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) || 
                coin.symbol.toLowerCase().includes(query.toLowerCase());
        });

        setCoins(coinsFiltered);
        
    }

    useEffect(() => {

        let mounted = true;
        getData();

        return () => {
            mounted = false;
        }

    },[]);

    return (
        <View style={style.background}>
            <CoinsSearcher onChange={handleSearch} /> 
            { (!loading && coins.length == 0) ? <Text style={style.notFoundText}>Not found</Text> : null }
            <View style={style.container}>
                {
                    loading ? <ActivityIndicator color="#fff" size="large" style={style.loader} /> : null
                }
                <FlatList
                    data={coins}
                    renderItem={({item}) => 
                        <CoinsCard item={item} onPress={() => handlePress(item)}/>
                    }
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.blackPearl,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 0,

    },
    notFoundText: {
        color: Colors.zircon,
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center'
    },
    container: {
        backgroundColor: Colors.charade,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginBottom: 65,
    },
    text: {
        margin: 10,
        fontSize: 30
    },
    loader: {
        marginTop: '75%'
    }

});

export default CoinsScreen;
