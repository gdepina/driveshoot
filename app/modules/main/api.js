import axios from 'axios';

import firebase from "../../config/firebase";

const database = firebase.database();
import matchModel from '../../models/match'
import playerModel from '../../models/player'

export function getMatchsDB() {
    return database.ref('/match').once('value')
}
// get specified section
export function getMatchDB(matchId) {
    return database.ref(`/match/${matchId}`).once('value')
}


// add new section
export function addMatch(name, orgId, matchSize, courtType, location, datetime, locationName) {
    let key = database.ref('/match').push().key
    let model = matchModel(key, name, firebase.database.ServerValue.TIMESTAMP, orgId, matchSize, courtType, location, datetime, locationName)
    return { prom: database.ref('/match/'+ key).set(model), key}
}


// add new todo item into specified section
export function addPlayerItem(id, name) {
    return new Promise((resolve, reject) => {
        database.ref(`/${id}`).once('value').then((player) => {
            let players = player.val().players || []
            let key = database.ref(`/${id}`).push().key
            players.push(playerModel(key, name, firebase.database.ServerValue.TIMESTAMP))
            database.ref(`/${id}/players`).set(todos)
                .then( res => {resolve(res)})
                .catch( error => {reject(error)})
        })
    })
}

