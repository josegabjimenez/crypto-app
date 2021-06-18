import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import CoinScreen from './src/components/CoinScreen';
import CoinDetail from './src/components/CoinDetail/CoinDetailScreen';
import CasualScreen from './src/components/CasualScreen';

//Colors
import Colors from './src/res/Colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle:{
            backgroundColor: Colors.blackPearl,
            shadowOpacity: 0
          },
          headerTintColor: Colors.white
        }}    
      >

        <Stack.Screen 
          name="Coins" 
          component={CoinScreen}
        />

        <Stack.Screen 
          name="CoinDetail" 
          component={CoinDetail}
        />

        <Stack.Screen
          name="Casual"
          component={CasualScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
