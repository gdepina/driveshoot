import React from 'react';
const { View, StyleSheet, Alert, ImageBackground } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { color } from "../../../styles/Theme"

import { actions as auth } from "../../auth"
var { signOut } = auth;

class Home extends React.Component {
    constructor(){
        super();
        this.state = { }
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.replace("Welcome")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

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
                source={require('./textura3.jpg')}
            >
                <View style={styles.container}>
                    <Button
                        large
                        raised
                        title={'Mis partidos'}
                        borderRadius={4}
                        backgroundColor={color.main}
                        containerViewStyle={[styles.buttonContainer, {marginVertical:4}]}
                        buttonStyle={{}} //optional
                        textStyle={styles.buttonText}
                        onPress={() => Actions.MatchList({ myMatchs: true })}
                    />
                    <Button
                        large
                        raised
                        title={'Crear partido'}
                        borderRadius={4}
                        backgroundColor={color.main}
                        containerViewStyle={[styles.buttonContainer, {marginVertical:4}]}
                        buttonStyle={{}} //optional
                        textStyle={styles.buttonText}
                        onPress={Actions.MatchCreator}
                        />
                    <Button
                        large
                        raised
                        title={'Ver partidos'}
                        borderRadius={4}
                        backgroundColor={color.main}
                        containerViewStyle={[styles.buttonContainer, {marginVertical:4}]}
                        buttonStyle={{}} //optional
                        textStyle={styles.buttonText}
                        onPress={Actions.MatchList}
                        />
                    <Button
                        large
                        raised
                        title={'Cerrar sesion'}
                        borderRadius={4}
                        backgroundColor={color.main}
                        containerViewStyle={[styles.buttonContainer, {marginVertical:4}]}
                        buttonStyle={{}} //optional
                        textStyle={styles.buttonText}
                        onPress={this.onSignOut.bind(this)}/>
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user:  state.authReducer.user
    }
}

export default connect(mapStateToProps, { signOut })(Home);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonContainer:{
        marginVertical:0, marginHorizontal:0
    },

    buttonText:{
        fontWeight:"500"
    }
});



