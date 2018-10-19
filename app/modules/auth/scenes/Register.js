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
        key:'username',
        label: "Username",
        placeholder:"Username",
        autoFocus:false,
        secureTextEntry:false,
        value: "",
        type: "text"
    },
    {
        key:'email',
        label: "Email Address",
        placeholder:"Email",
        autoFocus:false,
        secureTextEntry:false,
        value: "",
        type: "email"
    },
    {
        key:'password',
        label: "Password",
        placeholder:"Password",
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



