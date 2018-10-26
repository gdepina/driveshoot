import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

import {Button, Text} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'

import { padding, color, fontSize } from "../../../styles/Theme"
import LottieView from "lottie-react-native";
const ball = require('./simple_ball_bounce.json');

export default class Welcome extends React.Component {
    render() {
        return (
            <ImageBackground
                style={{
                    backgroundColor: '#ccc',
                    flex: 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                }}
                source={require('./cancha.jpg')}
            >
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <Text h1 style={{ color: '#fff' }}>Goru</Text>
                        <View>
                            <LottieView
                                source={ball}
                                style={styles.ball}
                                loop
                                autoPlay
                            />
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Button
                            raised
                            title={'INGRESA'}
                            borderRadius={4}
                            backgroundColor={color.main}
                            containerViewStyle={[styles.buttonContainer, {marginVertical:4}]}
                            buttonStyle={{}} //optional
                            textStyle={styles.buttonText}
                            onPress={Actions.Login}/>
                        <Button
                            raised
                            title={'CREAR CUENTA'}
                            borderRadius={4}
                            backgroundColor={color.main}
                            containerViewStyle={styles.buttonContainer}
                            buttonStyle={{}} //optional
                            textStyle={styles.buttonText}
                            onPress={Actions.Register}/>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    wrapper:{
        flex:1, justifyContent:"center", alignItems:"center"
    },
    ball: {
        width: 400,
        height: 180,
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