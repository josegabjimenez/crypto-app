import React, { useState } from 'react'
import { StyleSheet, Platform, TextInput, View } from 'react-native'

//Colors
import Colors from '../../res/Colors';

const CoinsSearcher = (props) => {

    const [text, setText] = useState("");

    const handleText = (query) => {
        setText(query);
        
        if(props.onChange){
            props.onChange(query);
        }

    }

    return (
        <View>
            <TextInput 
                style={[style.inputSearcher, Platform.OS == 'ios' ? style.inputSearcherIos : style.inputSearcherAndroid]}
                onChangeText={handleText}
                value={text}
                placeholder="Search coin..."
                placeholderTextColor={Colors.zircon}
            />
        </View>
    )
}

export default CoinsSearcher

const style = StyleSheet.create({
    inputSearcher: {
        padding: 8,
        color: Colors.zircon,
    },
    inputSearcherAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.zircon,
        marginBottom: 10,
    },
    inputSearcherIos: {
        borderRadius: 8,
        padding: 12,
        margin: 12,
        backgroundColor: Colors.charade,
    }
})
