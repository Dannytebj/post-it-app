const http = require('http');

module.exports = {
  get: function (callback) {
    const req = http.request({
      hostname: 'postitdanny.herokuapp.com',
      path: '/'
    }, function (response) {
      const data = '';
      response.on('data', function(chunk){
        data += chunk;
      });
      response.on('end', function(){
        callback(null, JSON.parse(data));
      });
    });
    req.end();
  // body...
},
post: function (data, callback) {
  const req = http.request({
    hostname: 'postitdanny.herokuapp.com',
    path: '/signIn',
    method: 'POST'
  }, function (response) {
    const data = '';
    response.on('data', function(chunk) {
      data += chunk;
    });
    response.on('end', function(){
      callback(null,JSON.parse(data));
    });
  });
  req.write(JSON.stringify(data));
  req.end();
}
};
