import React from 'react';
import AppStackNavigator from '../AppStackNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
    return (
        <AppStackNavigator>
            <Stack.Screen 
                name="Favorites 🤍"
                component={FavoritesScreen}
            />
        </AppStackNavigator>
    )
}

export default FavoritesStack;