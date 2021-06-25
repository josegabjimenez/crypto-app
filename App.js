import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CoinsStack from './src/components/CoinsStack';
import FavoritesStack from './src/components/Favorites/FavoritesStack';

//Colors
import Colors from './src/res/Colors';

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          inactiveTintColor: Colors.zircon,
          style: {
            backgroundColor: Colors.blackPearl,
            borderTopWidth: 3,
            borderTopColor: Colors.charade,
          }
        }}
      >
        <Tabs.Screen 
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <Image 
              style={{tintColor: color, width: size, height: size}}
              source={require("./src/assets/bank.png")} />
            )
          }}
        />

        <Tabs.Screen 
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <Image 
                style={{tintColor: color, height: size, width: size}}
                source={require("./src/assets/star.png")} 
              />
            )
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

