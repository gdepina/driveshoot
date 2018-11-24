import React from 'react';

var {View, StyleSheet, Dimensions, FlatList, ActivityIndicator } = require('react-native');

import { SearchBar, List, ListItem } from 'react-native-elements'

import {connect} from 'react-redux';


import { actions } from "../"
import * as Theme from "../../../styles/Theme";
const {padding} = Theme;
import { AppFontLoader } from '../../AppFontLoader';
import Geocoder from 'react-native-geocoding';
import {Actions} from "react-native-router-flux";


const device_width = Dimensions.get('window').width;

const { loadMatchs, loadMatch } = actions;

class MatchList extends React.Component {
    constructor() {
        super();
        this.getMatches = this.getMatches.bind(this);
        this.filterByValue = this.filterByValue.bind(this);
        this.renderFooter = this.renderFooter.bind(this);

        this.state = {
            loading: false,
            data: null,
        }
        Geocoder.init('AIzaSyDj9i_GKdG2tV2mL-Nd78ZWg8_yp2abGYo');
    }

    componentDidMount() {
        this.props.loadMatchs();
    }

    componentWillReceiveProps(nextProps) {
        const { matches, user, myMatchs } = nextProps;


        this.setState({
            matches: myMatchs ? Object.values(matches).filter(o => o.organizatorId === user.uid) : matches,
        })
    }

    getMatches() {
        const { matches, user, myMatchs } = this.props;
        return myMatchs ? Object.values(this.props.matches).filter(o => o.organizatorId === user.uid) : matches
    }


    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    }

    filterByValue(text) {
        const matches = this.getMatches();
        const matchesFiltered = Object.values(matches).filter(o => {
            return Object.keys(o).some(k => {
                return typeof o[k] === 'string' && o[k].toLowerCase().includes(text.toLowerCase())
            })
        });

        this.setState({
            matches: matchesFiltered,
            value: text,
        })
    }


    renderHeader() {
        return <SearchBar noIcon round lightTheme onChangeText={this.filterByValue} value={this.state.value} onClearText={null} placeholder='Partido de pepo...' />;
    }

    renderFooter() {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    onPressRow(id) {
        // this.props.loadMatch(id)
        return Actions.Match({id});
    }


    render() {

        const matches = this.state.matches || this.props.matches;
        return (
            <AppFontLoader>
                <View style={styles.container}>
                    { this.renderHeader() }
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList
                            data={matches ? Object.values(matches) : null}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListFooterComponent={this.renderFooter}
                            renderItem={({ item }) => (
                                <ListItem
                                    key={item.id}
                                    roundAvatar
                                    title={item.name}
                                    subtitle={`${ "players" in item ? item.players.length : "0"} / ${item.matchSize} | ${item.locationName}` }
                                    containerStyle={{ borderBottomWidth: 0 }}
                                    onPress={() => this.onPressRow(item.id)}
                                />
                                )}
                            keyExtractor={item => item.id}
                        />
                    </List>
                </View>
            </AppFontLoader>

        )
    }
}

function mapStateToProps(state, props) {
    return {
        matches:  state.mainReducer.matches,
        user:  state.authReducer.user,
    }
}

export default connect(mapStateToProps, { loadMatchs, loadMatch })(MatchList);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});



