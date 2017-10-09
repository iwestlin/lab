function words (s) {
  var a = s.split(/\s+/g)
  var result = []
  a.forEach(v => {
    var temp = v.split('').sort().join('')
    if (!result[temp]) {
      result[temp] = [v]
    } else {
      result[temp].push(v)
    }
  })
  return result
}

console.table(words('red der span pans'))
