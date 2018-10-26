import React from 'react';
import {Scene, Router, ActionConst, Stack} from 'react-native-router-flux';
const { StyleSheet } = require('react-native');

import Splash from '../modules/splash/Splash';
import Home from '../modules/main/scenes/Home';
import MatchCreator from '../modules/main/scenes/MatchCreator';
import Match from '../modules/main/scenes/Match';
import MatchList from '../modules/main/scenes/MatchList';

import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import Login from '../modules/auth/scenes/Login';

import firebase from "../config/firebase"
import { actions } from "../modules/auth"
import {connect} from 'react-redux';

const { storeUser } = actions;



class Routes extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        console.ignoredYellowBox = ['Setting a timer']
        this.checkToken();
    }

    checkToken() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) this.setState({isReady: true, isLoggedIn: true, user: user}, () => this.props.storeUser(user))
            else this.setState({isReady: true, isLoggedIn: false})
        });
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitle} tintColor='white'
                    barButtonTextStyle={styles.barButtonTextStyle} barButtonIconStyle={styles.barButtonIconStyle}
              >
                <Scene key="root" hideNavBar>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="Respira el futbol" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register"/>
                        <Scene key="Login" component={Login} title="Login"/>
                    </Stack>


                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key="Home" component={Home} title="Goru" initial={true} type={ActionConst.REPLACE} hideNavBar/>
                        <Scene key="MatchCreator" component={MatchCreator} title="Crea tu partido" user={this.state.user} />
                        <Scene key="MatchList" component={MatchList} title="Busca tu partido" user={this.state.user} />
                        <Scene key="Match" component={Match} title="Partido"  user={this.state.user} />
                    </Stack>
                </Scene>
            </Router>
        )
    }
}


export default connect(null, {storeUser})(Routes);

const styles = StyleSheet.create({
    navBar: {
        backgroundColor:'#397af8',
    },
    navBarTitle:{
        color:'#FFFFFF'
    },
    barButtonTextStyle:{
        color:'#FFFFFF'
    },
    barButtonIconStyle:{
        tintColor:'#FFFFFF'
    },

});
