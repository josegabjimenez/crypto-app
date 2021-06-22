import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//Colors
import Colors from '../res/Colors';

const Stack = createStackNavigator();

const AppStackNavigator = (props) => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowOpacity: 0, 
                },
                headerTintColor: Colors.zircon,
                headerBackTitleVisible: false,
            }}
        >
            {props.children}
        </Stack.Navigator>
    )
}

export default AppStackNavigator;