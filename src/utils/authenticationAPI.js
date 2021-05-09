const request = require('request')
const crypto = require('crypto')
const urlGetOTP = 'https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP'
const urlConfirmOTP ='https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP'

const generateOTP = (mobile, callback) => {
   request({
           url: urlGetOTP,
           method: 'POST',
           json: {mobile}
       },
       (error, response, body) =>{
       if(error){
           callback('Unable to connect to server', undefined)
       } else {
           callback(undefined, {txnId: body.txnId})
       }
   })
}

const generateToken = (otpPlain, txnId, callback) => {
    const otp = generateSHA256(otpPlain)
    request({
            url: urlConfirmOTP,
            method: 'POST',
            json: {otp, txnId}
        },
        (error, response, body) =>{
            if(error){
                callback('Unable to connect to server', undefined)
            } else {
                callback(undefined, {token: body.token})
            }
        })
}

const generateSHA256 = (otp) => crypto.createHash('sha256').update(otp).digest('hex')

module.exports = {generateOTP, generateToken}