import React from 'react';
var { View, StyleSheet, TextInput, Dimensions } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import {connect} from 'react-redux';
import { MapView } from "expo";

import { color } from "../../../styles/Theme"
import StepIndicator from 'react-native-step-indicator';


import { actions as auth } from "../../auth"
const device_width = Dimensions.get('window').width;
var { signOut } = auth;

class MatchCreator extends React.Component {
    constructor(){
        super();
        this.state = {
            currentPosition: 0,
            end_location: null,
            region: {
                latitude: -34.6157437,
                longitude: -58.5733832,
                latitudeDelta: 0.3922,
                longitudeDelta: 0.3421,
            },
        }
        Geocoder.init('AIzaSyDj9i_GKdG2tV2mL-Nd78ZWg8_yp2abGYo');
    }


    selectDestination = (data, details = null) => {

        const latDelta = Number(details.geometry.viewport.northeast.lat) - Number(details.geometry.viewport.southwest.lat)
        const lngDelta = Number(details.geometry.viewport.northeast.lng) - Number(details.geometry.viewport.southwest.lng)

        let region = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta
        };

        this.setState({
            end_location: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
            },
            region: region,
        });

    }


    render() {
        const labels = ["Ubicación","Partido","Juga"];
        const customStyles = {
            stepIndicatorSize: 25,
            currentStepIndicatorSize:30,
            separatorStrokeWidth: 2,
            currentStepStrokeWidth: 3,
            stepStrokeCurrentColor: '#fe7013',
            stepStrokeWidth: 3,
            stepStrokeFinishedColor: '#fe7013',
            stepStrokeUnFinishedColor: '#aaaaaa',
            separatorFinishedColor: '#fe7013',
            separatorUnFinishedColor: '#aaaaaa',
            stepIndicatorFinishedColor: '#fe7013',
            stepIndicatorUnFinishedColor: '#ffffff',
            stepIndicatorCurrentColor: '#ffffff',
            stepIndicatorLabelFontSize: 13,
            currentStepIndicatorLabelFontSize: 13,
            stepIndicatorLabelCurrentColor: '#fe7013',
            stepIndicatorLabelFinishedColor: '#ffffff',
            stepIndicatorLabelUnFinishedColor: '#aaaaaa',
            labelColor: '#999999',
            labelSize: 13,
            currentStepLabelColor: '#fe7013',
        }
        return (
            <View style={styles.container}>
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={this.state.currentPosition}
                    labels={labels}
                    stepCount={3}
                />
                <MapView
                    style={{
                        flex: 1
                    }}
                    initialRegion={this.state.region}
                >
                {
                    this.state.end_location &&
                    <MapView.Marker
                        pinColor="#4196ea"
                        coordinate={this.state.end_location}
                    />
                }
                </MapView>

                {/*<MapView.Callout>*/}
                    {/*<View style={styles.calloutView} >*/}
                        {/*<TextInput style={styles.calloutSearch}*/}
                                   {/*placeholder={"Buscar"}*/}
                        {/*/>*/}
                    {/*</View>*/}
                {/*</MapView.Callout>*/}
                <View style={styles.search_field_container}>

                    <GooglePlacesAutocomplete
                        ref="endlocation"
                        placeholder='¿Donde jugamos?'
                        minLength={5}
                        returnKeyType={'search'}
                        listViewDisplayed='auto'
                        fetchDetails={true}
                        onPress={this.selectDestination}
                        query={{
                            key: "AIzaSyDj9i_GKdG2tV2mL-Nd78ZWg8_yp2abGYo",
                            language: 'es',
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%',
                                backgroundColor: '#FFF'
                            },
                            listView: {
                                backgroundColor: '#FFF'
                            }
                        }}
                        debounce={200}
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user:  state.authReducer.user
    }
}

export default connect(mapStateToProps, { signOut })(MatchCreator);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
    },

    buttonText:{
        fontWeight:"500"
    },
    calloutView: {
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 7,
        width: "50%",
        marginLeft: "25%",
        marginRight: "25%",
        marginTop: 90
    },
    search_field_container: {
        height: 150,
        width: device_width,
        position: 'absolute',
        top: 52
    },
    calloutSearch: {
        borderColor: "transparent",
        marginLeft: 10,
        width: "90%",
        marginRight: 10,
        height: 40,
        borderWidth: 0.0
    }
});



