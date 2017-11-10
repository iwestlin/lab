// you can get your access token from here:
// http://services.chrisriversdesign.com/instagram-token/
var ACCESS_TOKEN = 'paste your access token here'
var URL = 'https://api.instagram.com/v1/users/self/media/liked?access_token=' + ACCESS_TOKEN + '&count=33'
var DELAY = 1000
var count = 1
var all = []
myFetch(URL)
var a = document.createElement('a')
a.download = ''

// after all liked images pushed into 'all' array, run
// downloadImgs(all, 333)
function downloadImgs (arr, delay) {
  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      a.href = arr[i]
      a.click()
    }, i * delay)
  }
}

function onePage (data) {
  var result = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].carousel_media) {
      var imgs = data[i].carousel_media
      for (let j = 0; j < imgs.length; j++) {
        var url = getImgUrl(imgs[0])
        url && result.push(url)
      }
    } else if (typeof data[i].images === 'object') {
      var url = getImgUrl(data[i])
      url && result.push(url)
    }
  }
  return result
}

function getImgUrl (obj) {
  if (typeof obj.images === 'object') {
    var url = obj.images.standard_resolution.url
    return url.replace(/\/\w+640x640/, '')
  }
}

function myFetch (url) {
  fetch(url, {method: 'get', credentials: 'include'})
  .then(res => {
    if (res.ok) {
      return res.text()
    }
  })
  .then(data => {
    data = JSON.parse(data)
    all = all.concat(onePage(data.data))
    console.log('done in page ' + count++)
    setTimeout(() => {
      myFetch(data.pagination.next_url)
    }, DELAY)
  })
}
