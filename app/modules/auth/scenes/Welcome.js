import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'

import { padding, color, fontSize } from "../../../styles/Theme"

export default class Welcome extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.appTitle}>Goru</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Button
                        raised
                        title={'LOG IN'}
                        borderRadius={4}
                        backgroundColor={color.main}
                        containerViewStyle={[styles.buttonContainer, {marginVertical:4}]}
                        buttonStyle={{}} //optional
                        textStyle={styles.buttonText}
                        onPress={Actions.Login}/>
                    <Button
                        raised
                        title={'CREATE ACCOUNT'}
                        borderRadius={4}
                        backgroundColor={color.main}
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={{}} //optional
                        textStyle={styles.buttonText}
                        onPress={Actions.Register}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    wrapper:{
        flex:1, justifyContent:"center", alignItems:"center"
    },

    appTitle:{
        fontSize:fontSize.large, fontWeight:"500"
    },

    bottomContainer:{
        padding:padding
    },

    buttonContainer:{
        marginVertical:padding, marginHorizontal:0
    },

    buttonText:{
        fontWeight:"500"
    }
});