var request = require('request');
var RSS = require('rss');

function fuckme(html) {
  var oieggfeed = new RSS({
    title: 'lofter fav pic',
    description: 'lofter喜欢的图片',
    feed_url: 'http://www.lofter.com/favblog/username',
    site_url: 'http://www.lofter.com'
  });
  var reg = /data-origin="(.+?\.jpg)/g;
  var result = html.match(reg);
  for (var i = 0; i < result.length; i++) {
    oieggfeed.item({
      title: 'lofter fav pic',
      description: 'lofter喜欢的图片',
      url: result[i].substring(13, result[i].length)
    })
  }

  return oieggfeed.xml();
}

function index(response) {
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
  response.write("index");
  response.end();
}

function feed(response, query) {
  var users = ['comeahair'];
  if (users.indexOf(query) >= 0) {
    try {
      request('http://www.lofter.com/favblog/' + query, function(err, res, body) {
        if (!err && res.statusCode === 200) {
          response.writeHead(200, {
            "Content-Type": "text/xml"
          });
          response.end(fuckme(body));
        } else {
          response.writeHead(404, {
            "Content-Type": "text/plain"
          });
          response.write("404 Not found");
          response.end();
        }
      })
    } catch (err) {}
  } else {
    response.writeHead(404, {
      "Content-Type": "text/plain"
    });
    response.write("404 Not found");
    response.end();
  }
}

exports.index = index;
exports.feed = feed;
