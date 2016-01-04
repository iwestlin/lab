  var chooseLevel = document.getElementById('chooseLevel');
  var chooseLevelButton = document.getElementById('chooseLevelButton');
  chooseLevelButton.onclick = function() {
    var cookieString = 'gs=0 0 0 0 ';
    cookieString += chooseLevel.value;
    document.cookie = cookieString;
    location.replace(location.href);
  }
