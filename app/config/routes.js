import React from 'react';
import {Scene, Router, ActionConst, Stack} from 'react-native-router-flux';

import Splash from '../modules/splash/Splash';
import Home from '../modules/main/scenes/Home';
import MatchCreator from '../modules/main/scenes/MatchCreator';
import Match from '../modules/main/scenes/Match';
import MatchList from '../modules/main/scenes/MatchList';

import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import Login from '../modules/auth/scenes/Login';

import firebase from "../config/firebase"

export default class extends React.Component {
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
            if (user) this.setState({isReady: true, isLoggedIn: true, user: user})
            else this.setState({isReady: true, isLoggedIn: false})
        });
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Scene key="root" hideNavBar>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="Respira el futbol" initial={true}/>
                        <Scene key="Register" component={Register} title="Register"/>
                        <Scene key="Login" component={Login} title="Login"/>
                    </Stack>


                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key="Home" component={Home} title="Goru" initial={true} type={ActionConst.REPLACE}/>
                        <Scene key="MatchCreator" component={MatchCreator} title="Crea tu partido" user={this.state.user} />
                        <Scene key="MatchList" component={MatchList} title="Buscar tu partido" user={this.state.user} />
                        <Scene key="Match" component={Match}  user={this.state.user} />
                    </Stack>
                </Scene>
            </Router>
        )
    }
}