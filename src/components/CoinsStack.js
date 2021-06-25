import React from 'react';
import CoinsScreen from './Coins/CoinsScreen';
import CoinDetailScreen from './CoinDetail/CoinDetailScreen';
import AppStackNavigator from './AppStackNavigator';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const CoinsStack = () => {
    return(
        <AppStackNavigator>
            <Stack.Screen
                name="Coins"
                component={CoinsScreen}
            />

            <Stack.Screen
                name="CoinDetail"
                component={CoinDetailScreen}
            />
        </AppStackNavigator>
    )
}

export default CoinsStack;