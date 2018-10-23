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

class Match extends React.Component {
    constructor() {
        super();
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

    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    }

    renderHeader() {
        return <SearchBar noIcon round lightTheme onChangeText={null} onClearText={null} placeholder='Type Here...' />;
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

        return (
            <AppFontLoader>
                <View style={styles.container} >
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList
                            data={Object.values(this.props.matches)}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListHeaderComponent={this.renderHeader}
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

export default connect(mapStateToProps, { loadMatchs, loadMatch })(Match);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    container_step_1: {
        flex: 1,
        marginLeft: 20,
    },
    container_congrats: {
        width: 400,
        height: 180,
        marginLeft: 45
    },
    buttonText: {
        fontWeight: "500"
    },
    search_field_container: {
        height: 150,
        width: device_width,
        position: 'absolute',
    },
    calloutSearch: {
        borderColor: "transparent",
        marginLeft: 10,
        width: "90%",
        marginRight: 10,
        height: 40,
        borderWidth: 0.0
    },
    buttonContainer: {
        marginVertical: padding * 2,
        marginHorizontal: 0
    },
    row: {
        marginBottom: 15,
    }
});



