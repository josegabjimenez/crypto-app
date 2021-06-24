import React, { useState, useEffect } from 'react';
import { View, Text, Image, SectionList, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import CoinDetailMarketItem from './CoinDetailMarketItem';

//Loading component
import Loading from '../Loading';

//Http method class
import Http from '../../lib/Http';

//Storage
import Storage from '../../res/Storage';

//Colors style
import Colors from '../../res/Colors';

function CoinDetailScreen(item) {

    const [coin, setCoin] = useState({});
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    //Return the symbol image of the current coin.
    const getImage = (nameid) => {
        if (nameid) {
            return `https://c1.coinlore.com/img/25x25/${nameid}.png`
        }
    }

    //Extract market cap, volume in 24h, and coin change in 24h of the current coin. 
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

    //The coin passed through props is set to the state.
    const getCoins = () => {
        item.navigation.setOptions({ title: item.route.params.symbol });
        setCoin(item.route.params);
    };

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite();
        } else {
            addFavorite();
        }
    }

    const addFavorite = async () => {
        const coinString = JSON.stringify(coin);
        const key = `favorite-${coin.id}`;
        const saved = await Storage.instance.store(key, coinString);

        console.log("Stored: ", saved);

        if (saved) {
            setIsFavorite(true);
        }

    }

    const removeFavorite = () => {

        Alert.alert("Remove favorite", "Are you sure?", [
            {
                text: "cancel",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: 'remove',
                onPress: async () => {
                    const key = `favorite-${coin.id}`;
                    const removed = await Storage.instance.remove(key);
            
                    if (removed) {
                        setIsFavorite(false);
                    }
                },
                style: 'destructive',
            }
        ])

    }

    const checkFavorite = async (coin) => {
        try {
            const key = `favorite-${coin.id}`;
            const checked = await Storage.instance.get(key);
    
            console.log(checked);
    
            if(checked !== null){
                setIsFavorite(true);
            }    
        } catch (err) {
            console.log("Error checking favorite: ", err);
        }

    }

    useEffect(() => {

        //Variable to know if the component is mounted or not.
        let mounted = true;

        getCoins();

        //The markets that have the current coin are set to the state.
        const getMarkets = async (coinId) => {
            setLoading(true);
            const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
            const markets = await Http.instance.get(url);
            markets.splice(markets.lenght - 3, 2);
            if (mounted) {
                setMarkets(markets);
                setLoading(false);
            }
        }

        getMarkets(item.route.params.id);

        checkFavorite(item.route.params);

        return () => {
            //Cleanup
            mounted = false;
        }

    }, []);

    return (
        <View style={style.container}>
            <View style={style.subHeader}>
                <Image style={style.coinImage} source={{ uri: getImage(coin.nameid) }}></Image>
                <Text style={style.coinTitle}>{coin.name}</Text>
            </View>

            <Pressable
                style={[style.btnFavorite, isFavorite ? style.btnFavoriteRemove : style.btnFavoriteAdd]}
                onPress={toggleFavorite}
            >
                <Text style={isFavorite ? style.btnTextRemove : style.btnTextAdd}>{isFavorite ? "Remove favorite" : "Add favorite"}</Text>
            </Pressable>

            <View style={style.info}>
                <SectionList
                    style={style.sectionList}
                    keyExtractor={(item) => item}
                    sections={getSections(coin)}
                    renderItem={({ item }) =>
                        <View style={style.sectionItem}>
                            <Text style={style.itemText}>{item}</Text>
                        </View>
                    }
                    renderSectionHeader={({ section }) =>
                        <View style={style.sectionHeader}>
                            <Text style={style.sectionText}>{section.title}</Text>
                        </View>
                    }
                />
            </View>

            <View>
                <Text style={style.marketsTitle}>Markets</Text>
                {
                    loading ? <Loading /> : null
                }
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    data={markets}
                    renderItem={({ item }) =>
                        <CoinDetailMarketItem item={item} />
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
        justifyContent: 'center',
        //backgroundColor: 'rgba(0,0,0,0.4)',
    },
    btnFavorite: {
        borderWidth: 2,
        borderRadius: 8,
        padding: 8,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
        // marginLeft: 100,
        // marginRight: 100,
    },
    btnFavoriteAdd: {
        borderColor: Colors.picton,
    },
    btnFavoriteRemove: {
        borderColor: Colors.carmine,
        backgroundColor: Colors.carmine,
    },
    btnTextAdd: {
        color: Colors.picton,
        fontWeight: 'bold',
    },
    btnTextRemove: {
        color: Colors.zircon,
        fontWeight: 'bold',
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
