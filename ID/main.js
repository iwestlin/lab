var weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]

function getLastNumber (s) {
  var a = s.split('').map(v => parseInt(v))
  var sum = 0
  a.forEach((v, i) => {
    sum += v * weights[i]
  })
  var r = (12 - (sum % 11)) % 11
  return r === 10 ? 'X' : r.toString()
}

function getRandomElement (a) {
  var i = Math.floor(Math.random() * a.length)
  return a[i]
}

function getRandomAddressCode () {
  return getRandomElement(Object.keys(addressCodes))
}

function getRandomBirthdayCode () { // 1944-09-09 及以后
  var now = new Date()
  now = now.getTime()
  var begin = -1000000000000 // Sep 09 1944
  var t = Math.floor(Math.random() * (now - begin))
  t += begin
  var d = new Date(t)
  return '' + d.getFullYear() + fixDate(d.getMonth() + 1) + fixDate(d.getDate())
}

function fixDate (n) {
  n = n.toString()
  if (n.length > 1) {
    return n
  } else {
    return '0' + n
  }
}

function getRandomIndex () {
  var s = Math.floor(Math.random() * 1000).toString()
  var diff = 3 - s.length
  for (var i = 0; i < diff; i++) {
    s = '0' + s
  }
  return s
}

function generateRandomID () {
  var s = getRandomAddressCode() + getRandomBirthdayCode() + getRandomIndex()
  return s + getLastNumber(s)
}

function detectID (s) {
  s = s.toString()
  var len = s.length
  if (len !== 18) {
    console.log('身份证号码必须为 18 位！')
    return false
  }
  var lastNumber = s[len - 1]
  if (getLastNumber(s.slice(0, len - 1)) !== lastNumber) {
    console.log('不是有效身份证号！')
    return false
  }
  var addressCode = s.slice(0, 6)
  var birthdayCode = s.slice(6, 14)
  var indexCode = s.slice(14, 17)
  var result = {}
  result.gender = parseInt(indexCode) % 2 === 0 ? '女' : '男'
  result.birthday = parseBirthday(birthdayCode)
  result.birthplace = parseAddress(addressCode)
  return result
}

function parseBirthday (s) { // '20120421'
  s = s.toString()
  var year = s.slice(0, 4)
  var month = s.slice(4, 6)
  var day = s.slice(6, 8)
  return year + ' 年 ' + parseInt(month) + ' 月 ' + parseInt(day) + ' 日'
}

function parseAddress (s) {
  s = s.toString()
  var province = s.slice(0, 2)
  var city = s.slice(0, 4)
  return provinceCodes[province] + ' ' + cityCodes[city] + ' ' + addressCodes[s]
}
