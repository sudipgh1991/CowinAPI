const express = require('express')
const locationDetails = require('./utils/getLocationDetails')
const appointmentAvailibilty = require('./utils/getAppointmentAvailability')
const authentication = require('./utils/authenticationAPI')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = process.env.PORT || 3000


app.get('/states', (req, res) => {
    locationDetails.states((error, {states} = {}) =>{
        if(error){
            return res.send({
                error: error
            })
        }
        res.send({
            states
        })
    })
})

app.get('/districts', (req, res) => {
    locationDetails.districts(req.query.id, (error, {districts} = {}) =>{
        if(error){
            return res.send({
                error: error
            })
        }
        res.send({
            districts
        })
    })
})

app.get('/findByPin', (req, res) => {
    appointmentAvailibilty.findByPin(req.query.pincode, req.query.date, (error, {sessions} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        res.send({
            sessions
        })
    })
})

app.get('/findByDistrict', (req, res) => {
    appointmentAvailibilty.findByDistrict(req.query.district_id, req.query.date, (error, {sessions} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        res.send({
            sessions
        })
    })
})

app.post('/getOTP', (req,res) => {
    authentication.generateOTP(req.body.mobile, (error, {txnId} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        res.send({
            txnId
        })
    })
})

app.post('/getToken', (req,res) => {
    authentication.generateToken(req.body.otp, req.body.txnId, (error, {token} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        res.send({
            token
        })
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})