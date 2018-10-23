import React from 'react';

var {View, StyleSheet, Dimensions, FlatList} = require('react-native');

import {connect} from 'react-redux';


import {actions} from "../"
import * as Theme from "../../../styles/Theme";

const {padding} = Theme;
import { List, ListItem, Text, FormLabel, Card} from 'react-native-elements'


const device_width = Dimensions.get('window').width;

const {loadMatch} = actions;

class Match extends React.Component {
    constructor() {
        super();
        this.renderPlayers = this.renderPlayers.bind(this);
    }

    componentDidMount() {
        this.props.loadMatch(this.props.id);
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

    renderPlayers() {
        return (<Card title="Jugadores">
            {
                <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                    <FlatList
                        data={this.props.currentMatch && this.props.currentMatch.players !== undefined  ? this.props.currentMatch.players : []}
                        ItemSeparatorComponent={this.renderSeparator}
                        renderItem={({player}) => (
                            <ListItem
                                key={player.id}
                                roundAvatar
                                title={player.name}
                                containerStyle={{borderBottomWidth: 0}}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </List>
            }
        </Card>)
    }

    renderMatch() {
        const match = this.props.currentMatch ? this.props.currentMatch : this.props.matches[this.props.id]
        const {name, matchSize, locationName, datetime, courtType} = match;
        return (<Card title={name}>
            {
                <View>
                    <FormLabel>{"Partido"}</FormLabel>
                    <Text style={styles.matchItem} h5>{matchSize/2 + 'vs' + matchSize/2}</Text>
                    <FormLabel>{"Lugar"}</FormLabel>
                    <Text style={styles.matchItem}  h5>{locationName}</Text>
                    <FormLabel>{"Cuando"}</FormLabel>
                    <Text style={styles.matchItem}  h5>{datetime}</Text>
                    <FormLabel>{"Cancha"}</FormLabel>
                    <Text style={styles.matchItem}  h5>{courtType}</Text>
                </View>
            }
        </Card>)
    }


    render() {

        return (
            <View style={styles.container}>
                {this.renderMatch()}
                {this.renderPlayers()}
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        matches: state.mainReducer.matches,
        currentMatch: state.mainReducer.currentMatch,
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, {loadMatch})(Match);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    matchItem: {
        marginLeft: 20,
    }
});



