import React from 'react'
import { ActivityIndicator } from 'react-native'

//Import app colors
import Colors from '../res/Colors';

const Loading = () => {
    return (
        <ActivityIndicator color={Colors.zircon} size="large" />
    )
}

export default Loading

