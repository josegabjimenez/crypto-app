import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CharacterScreen from './CoinScreen'

const Stack = createStackNavigator();

function CharacterStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Characters" component={CharacterScreen} />
        </Stack.Navigator>
    )
}

export default CharacterStack
