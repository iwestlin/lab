var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;
    route(handle, pathname, response, query);
  }
  http.createServer(onRequest).listen(5050);
}

exports.start = start;
