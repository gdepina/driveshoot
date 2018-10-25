import React from 'react';

var {View, StyleSheet, Dimensions, FlatList, ScrollView} = require('react-native');

import {connect} from 'react-redux';


import {actions} from "../"
import * as Theme from "../../../styles/Theme";

const {padding} = Theme;
import {List, ListItem, Text, FormLabel, Card, Button, Icon} from 'react-native-elements'


const device_width = Dimensions.get('window').width;
import { AppFontLoader } from '../../AppFontLoader';

const {loadMatch} = actions;

class Match extends React.Component {
    constructor() {
        super();
        this.renderPlayers = this.renderPlayers.bind(this);
    }

    componentDidMount() {
        this.props.id && this.props.loadMatch(this.props.id);
    }

    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: "90%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "6%"
                }}
            />
        );
    }
    renderCardHeader() {
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop:20, marginBottom: 20 }}>
                <Button
                    title={"Unirme"}
                    borderRadius={4}  //optional
                    backgroundColor={"#397af8"} //optional
                    // containerViewStyle={styles.buttonContainer} //optional
                />
                <Button
                    title={"Bajarme"}
                    borderRadius={4}  //optional
                    backgroundColor={"#397af8"} //optional
                    // containerViewStyle={styles.buttonContainer} //optional
                />
            </View>)
    }

    renderPlayers() {
        return (<Card title="Jugadores">
            {
                <AppFontLoader>
                    <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                        <FlatList
                            data={this.props.currentMatch && this.props.currentMatch.players !== undefined  ? this.props.currentMatch.players : []}
                            renderItem={(player) => (
                                <ListItem
                                    key={player.item.id}
                                    hideChevron
                                    avatar={"https://ui-avatars.com/api/?background=0D8ABC&color=fff&name="+player.item.email.substring(0, 2).toUpperCase()}
                                    roundAvatar
                                    title={player.item.name || player.item.email}
                                    containerStyle={{borderBottomWidth: 0}}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />
                    </List>
                </AppFontLoader>
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
            <ScrollView style={styles.container}>
                {this.renderMatch()}
                {this.renderPlayers()}
                {this.renderCardHeader()}
            </ScrollView>
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



