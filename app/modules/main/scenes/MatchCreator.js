import React from 'react';

var {View, StyleSheet, Dimensions, Share} = require('react-native');

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import {connect} from 'react-redux';
import {MapView} from "expo";

import StepIndicator from 'react-native-step-indicator';
import { RNNumberStepper } from 'react-native-number-stepper';
import { FormLabel, Button, Text } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select';
import LottieView from 'lottie-react-native';
import {Actions} from 'react-native-router-flux';


import { actions } from "../"
import * as Theme from "../../../styles/Theme";
const {padding} = Theme;

const congrats = require('./congrats.json');

const device_width = Dimensions.get('window').width;
const { createMatch } = actions;

class MatchCreator extends React.Component {
    constructor() {
        super();
        this.onPressIndicator = this.onPressIndicator.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            currentPosition: 0,
            end_location: null,
            matchSize: 5,
            region: {
                latitude: -34.6157437,
                longitude: -58.5733832,
                latitudeDelta: 0.3922,
                longitudeDelta: 0.3421,
            },
            courtType: undefined,
            items: [
                {
                    label: 'Cesped artificial',
                    value: 'Cesped artificial',
                },
                {
                    label: 'Cesped natural',
                    value: 'Cesped natural',
                },
                {
                    label: 'Tierra',
                    value: 'Tierra',
                },
            ],
        }
        Geocoder.init('AIzaSyDj9i_GKdG2tV2mL-Nd78ZWg8_yp2abGYo');
    }


    onShare() {
        Share.share({
            message: '¿Sale doparti? - Sumate a goru entra aca -> http://bam.tech',
            url: 'http://bam.tech',
            title: 'GORU - Suma, juga ya'
        }, {
            // Android only:
            dialogTitle: 'Respira el futbol',
        })
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
            locationName: details.formatted_address,
            currentPosition: 1,
            region: region,
        });

    }


    onPressIndicator(position) {
        this.setState({
            currentPosition: position,
        });
    }

    onSubmit() {
        console.log(this.props.user)
        this.setState({
            currentPosition: 2,
        }, () => {
            this.animation.play();
            this.props.createMatch(this.props.user && `Partido de ${this.props.user.email}`,
                this.props.user.uid,
                this.state.matchSize,
                this.state.courtType,
                this.state.end_location,
                this.state.datetime,
                this.state.locationName,
                [{
                    id:  this.props.user.uid,
                    owner: true,
                    email: this.props.user.email,
                }]
            )
        });
    }


    render() {
        const labels = ["Ubicación", "Partido", "Juga"];
        const customStyles = {
            stepIndicatorSize: 25,
            currentStepIndicatorSize: 30,
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
                    onPress={this.onPressIndicator}
                />
                {
                    this.state.currentPosition === 0 &&
                    <View style={styles.container}>
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
                }{
                    this.state.currentPosition === 1 &&
                    <View style={styles.container}>
                        <View style={styles.container_step_1}>
                            <View style={styles.row}>
                                <FormLabel>{"Cantidad de jugadores"}</FormLabel>
                                <RNNumberStepper maxValue={20} value={this.state.matchSize} size={2}
                                onChange={(newValue) => this.setState({matchSize: newValue})}/>
                            </View>
                            <View style={styles.row}>
                                <FormLabel>{"¿Cuando y a que hora?"}</FormLabel>
                                <DatePicker
                                    style={{width: 200}}
                                    date={this.state.datetime}
                                    mode="datetime"
                                    format="YYYY-MM-DD HH:mm"
                                    confirmBtnText="Confirmar"
                                    cancelBtnText="Cancelar"
                                    showIcon={true}
                                    onDateChange={(datetime) => {this.setState({datetime: datetime});}}
                                />
                            </View>
                            <View style={styles.row}>
                                <FormLabel>{"Tipo de cancha"}</FormLabel>
                                <RNPickerSelect
                                    placeholder={{
                                        label: 'Elige un tipo...',
                                        value: null,
                                    }}
                                    items={this.state.items}
                                    onValueChange={(value) => {
                                        this.setState({
                                            courtType: value,
                                        });
                                    }}
                                    onUpArrow={() => {
                                        // this.inputRefs.name.focus();
                                    }}
                                    onDownArrow={() => {
                                        // this.inputRefs.picker2.togglePicker();
                                    }}
                                    value={this.state.courtType}
                                    ref={(el) => {
                                        // this.inputRefs.picker = el;
                                    }}
                                />
                            </View>
                        </View>
                        <Button
                            raised
                            title={'Confirmar'}
                            borderRadius={4}  //optional
                            backgroundColor={"#397af8"} //optional
                            containerViewStyle={styles.buttonContainer} //optional
                            onPress={this.onSubmit}/>
                    </View>

            }
            {
                this.state.currentPosition === 2 &&
                <View>
                    <LottieView
                        source={congrats}
                        style={styles.container_congrats}
                        loop={false}
                        autoPlay={false}
                        autoSize
                        ref={animation => {
                            this.animation = animation;
                        }}
                    />
                    <Text style={{ textAlign: "center" }} h4> {"Listo comparti el link y juga"} </Text>
                    <Button
                        raised
                        title={'Comparti'}
                        borderRadius={4}  //optional
                        backgroundColor={"#397af8"} //optional
                        containerViewStyle={styles.buttonContainer} //optional
                        onPress={this.onShare}
                        />
                    <Button
                        raised
                        title={'Ir al partido'}
                        borderRadius={4}  //optional
                        backgroundColor={"#397af8"} //optional
                        containerViewStyle={styles.buttonContainer} //optional
                        onPress={Actions.Match}
                    />
                </View>
            }
            </View>
        );
    }
}


export default connect(null, { createMatch })(MatchCreator);


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



