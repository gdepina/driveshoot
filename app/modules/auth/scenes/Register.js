import React from 'react';

var {View, StyleSheet, Alert} = require('react-native');

import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { actions as auth, Theme } from "../"
const { register } = auth;

import Form from "../components/Form"

const fields = [
    {
        key:'displayName',
        label: "NICKNAME",
        placeholder:"usuario",
        autoFocus:false,
        secureTextEntry:false,
        value: "",
        type: "text"
    },
    {
        key:'email',
        label: "EMAIL",
        placeholder:"goru@futbol.com",
        autoFocus:false,
        secureTextEntry:false,
        value: "",
        type: "email"
    },
    {
        key:'password',
        label: "CONTRASEÑA",
        placeholder:"Min 6 caracteres",
        autoFocus:false,
        secureTextEntry:true,
        value: "",
        type: "password"
    }
];

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            spinner: false
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(data) {
        // this.setState({spinner: true});
        this.props.register(data, this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        this.setState({spinner: false});
        Actions.Main()
    }

    onError(error) {
        this.setState({spinner: false});
        Alert.alert('Oops!', error.message);
    }

    render() {
        return (
            <View style={styles.container}>
                <Form fields={fields} onSubmit={this.onSubmit}/>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'One moment...'}
                    textStyle={{ color: '#fff' }} />
            </View>
        );
    }
}

export default connect(null, { register })(Register);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});



