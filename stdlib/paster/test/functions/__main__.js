/**
* A basic Hello World function
* @param {string} name the name of the people where the quotes come from
* @returns {string}
*/

const quotes = require('../quotes')

module.exports = (name = 'haha', context, callback) => {
  let myquotes = quotes[name]
  if (myquotes) {
    let len = myquotes.length
    let index = Math.floor(Math.random() * len)
    callback(null, myquotes[index])
  } else {
    callback(null, `Sorry, we don't have quotes of ${name} at present.`)
  }
}
