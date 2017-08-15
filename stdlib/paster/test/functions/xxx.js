/**
* @param {string} id 番号
* @returns {string}
*/

const magnets = require('../magnets')

module.exports = (id = 'hnd-075', context, callback) => {
  let newId = id.replace('-', '').toLowerCase()
  let magnet = magnets[newId]
  if (magnet) {
    callback(null, {
      found: true,
      value: magnet
    })
  } else {
    callback(null, {
      found: false,
      value: `Sorry, we don't have the magnet link of ${id} at present.`
    })
  }
}
