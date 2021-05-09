const request = require('request')
const url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public'
const findByPin = (pincode, date, callback) => {
    const uri = `${url}/findByPin?pincode=${pincode}&date=${date}`
    request({uri, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to server', undefined)
        } else {
            callback(undefined, {sessions: body.sessions})
        }
    })
}
const findByDistrict = (district_id, date, callback) => {
    const uri = `${url}/findByDistrict?district_id=${district_id}&date=${date}`
    request({uri, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to server', undefined)
        } else {
            callback(undefined, {sessions: body.sessions})
        }
    })
}

module.exports = {findByPin, findByDistrict}