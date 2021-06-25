import React from 'react';
import AppStackNavigator from '../AppStackNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';
import CoinDetailScreen from '../CoinDetail/CoinDetailScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
    return (
        <AppStackNavigator>
            <Stack.Screen 
                name="Favorites 🤍"
                component={FavoritesScreen}
            />
            <Stack.Screen
                name="FavoriteDetail"
                component={CoinDetailScreen}
            />
        </AppStackNavigator>
    )
}

export default FavoritesStack;