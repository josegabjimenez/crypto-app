import React, { useState, useEffect } from 'react';
import Http from '../lib/Http';

function useCoins(){
    const [coins,setCoins] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let res = await Http.instance.get('https://api.coinlore.net/api/tickers/');
            setCoins(res.data);
        }
        getData();
    },[]);

    return coins;
}

export default useCoins;