const request = require('request')
const url  = 'https://cdn-api.co-vin.in/api/v2/admin/location'
const states = (callback) => {
    const uri = `${url}/states`
    request({uri, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to server', undefined)
        } else {
            callback(undefined, {states: body.states})
        }
    })
}
const districts = (stateId, callback) => {
    const uri = `${url}/districts/${stateId}`
    request({uri, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to server', undefined)
        } else {
            callback(undefined, {districts: body.districts})
        }
    })
}
module.exports = { states, districts }
