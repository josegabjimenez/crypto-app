import React, { useState, useEffect } from 'react';
import { View, Text, Image, SectionList, FlatList, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import CoinDetailMarketItem from './CoinDetailMarketItem';

//Http method class
import Http from '../../lib/Http';

//Colors style
import Colors from '../../res/Colors';

function CoinDetailScreen(item) {

    const [coin, setCoin] = useState({});
    const [markets, setMarkets] = useState([]);

    const getImage = (nameid) => {
        if(nameid){
            return `https://c1.coinlore.com/img/25x25/${nameid}.png`
        }
    }

    const getSections = (coin) => {
        const sections = [
            {
                title: "Market cap",
                data: [coin.market_cap_usd],
            },
            {
                title: "Volume 24h",
                data: [coin.volume24],
            },
            {
                title: "Change 24h",
                data: [coin.percent_change_24h],
            }
        ]

        return sections;

    }

    const getCoins = () => {
        item.navigation.setOptions({title: item.route.params.symbol});
        setCoin(item.route.params);
    };

    const getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

        const markets = await Http.instance.get(url);

        setMarkets(markets);
    }

    useEffect(() => {
        getCoins();
        getMarkets(item.route.params.id);
    }, []);

    console.log(coin);
    console.log(markets);

    return (
        <View style={style.container}>
            <View style={style.subHeader}>
                <Image style={style.coinImage} source={{uri: getImage(coin.nameid)}}></Image>
                <Text style={style.coinTitle}>{coin.name}</Text>
            </View>

            <View style={style.info}>
                <SectionList
                    style={style.sectionList}
                    keyExtractor={(item) => item}
                    sections={getSections(coin)}
                    renderItem={({item}) => 
                        <View style={style.sectionItem}>
                            <Text style={style.itemText}>{item}</Text>
                        </View>
                    }
                    renderSectionHeader={({section}) => 
                        <View style={style.sectionHeader}>
                            <Text style={style.sectionText}>{section.title}</Text>
                        </View>
                    }
                />
            </View>

            <View>
                <Text style={style.marketsTitle}>Markets</Text>
                <FlatList
                    keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
                    horizontal={true}
                    data={markets}
                    renderItem={({item}) => 
                        <CoinDetailMarketItem item={item}/>
                    }
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blackPearl,
    },
    subHeader: {
        padding: 16,
        flexDirection: 'row',
        //backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
    },
    info: {
        margin: 20,
        padding: 15,
        backgroundColor: Colors.charade,
        borderRadius: 15,
    },
    sectionList: {
       // maxHeight: 200,
    },
    coinImage: {
        width: 18,
        height: 18,
        marginRight: 5,
        marginTop: 9,
        //position: 'absolute',
    },
    coinTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    },
    sectionItem: {
        padding: 8, 
        alignItems: 'center'
    },
    sectionHeader: {
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 20,
    },
    itemText: {
        color: Colors.zircon,
        fontSize: 16,
    },
    sectionText: {
        color: Colors.zircon,
        fontWeight: 'bold',
        fontSize: 16,
    },
    //Markets
    marketsTitle: {
        color: Colors.zircon,
        fontWeight: 'bold',
        fontSize: 26,
        textAlign: 'center',
        margin: 10,
    },

})

export default CoinDetailScreen
