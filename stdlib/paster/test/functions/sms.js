/**
* @param {string} tel phone number you're texting to
* @returns {string}
*/

const lib = require('lib')
const quotes = require('../quotes')

module.exports = (tel = '', context, callback) => {
  if (!tel) {
    callback(null, 'please give tel a phone number, like ?tel=911')
  }
  tel = '+86' + tel
  let randomMsg = quotes.haha ? quotes.haha[Math.floor(Math.random() * quotes.haha.length)] : 'excited!'

  lib.utils.sms({
    to: tel,
    body: randomMsg
  }, (err, result) => {
    callback(err, result)
  })
}
