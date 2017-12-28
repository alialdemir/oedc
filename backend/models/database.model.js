var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config =
  {
    userName: 'sa',
    password: '123',
    server: 'localhost',
    options:
      {
        database: 'SduSurvey'
      }
  }

 var connection = new Connection(config);

 connection.on('connect', function (err) {
  if (err) {
    console.log(err)
  }
  else {
    console.log('Connected database!');
  }
});

module.exports.Connection = connection;
