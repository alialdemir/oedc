var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES
var Connection = require('./database.model').Connection;

module.exports.Insert = function (data, callback) {
    request = new Request('INSERT INTO Curricula (Name, IsActive) OUTPUT INSERTED.Id VALUES (@Name, @IsActive);', callback);
    request.addParameter('Name', TYPES.NVarChar, data.Name);
    request.addParameter('IsActive', TYPES.Bit, data.IsActive);
    Connection.execSql(request);
}

module.exports.GetAll = function (callback) {
    return new Promise(function (resolve, reject) {
        var request = new Request("SELECT * FROM Curricula", function (err) {
            if (err) {
                console.log(err);
                reject(err);
            }
        });
        var jsonArray = [];
        request.on('row', function (columns) {
            columns.forEach(function (column) {
                var rowObject = {};
                columns.forEach(function (column) {
                    rowObject[column.metadata.colName] = column.value;
                });
                jsonArray.push(rowObject)
            });
            resolve(jsonArray);
        });
        Connection.execSql(request);
    });
}
