// var mysql = require('mysql');

var db = "";
var DBURL = "127.0.0.1";
var PORT = 6060;
module.exports = function(_db) {

    db = _db;

    function query(sql) {
        return new Promise(function(resolve, reject) {
            ok = require('./socketIO')();
            ok.connect(PORT, DBURL).write(sql).then(function(data) {
              //  console.log(data.toString("utf-8"));
                var retData = JSON.parse(data.toString("utf-8"));
                if(retData.errno){
                   reject(retData);
                } else{
                resolve(retData);
                  }
            });
        });
    }

    function createInsertSql(dataOb) {
        var keyStr = "";
        var valueStr = "";
        var data = dataOb.data;
        var table = dataOb.table;

        for (k in data) {
            keyStr += k + ",";
            valueStr += '"' + data[k] + '"' + ",";
        }

        keyStr = keyStr.slice(0, keyStr.length - 1);
        valueStr = valueStr.slice(0, valueStr.length - 1);

        var sql = 'INSERT INTO ' + _db + "." + table + ' (' + keyStr + ') VALUES (' + valueStr + ')';
        return sql;
    }

    function createSelectSql(dataOb) {
        var keyStr = "";
        var valueStr = "";
        var table = dataOb.table;
        var index = dataOb.index;

        if (index) {
            for (k in index) {
                keyStr += k + '=' + '"' + index[k] + '"' + "AND ";
            }
            keyStr = ' WHERE ' + keyStr.slice(0, keyStr.length - 4);
        } else {

        }
        var sql = 'SELECT * FROM ' + _db + "." + table + keyStr;
        return sql;
    }

    function createUpdateSql(dataOb) {
        var keyStr = "";
        var valueStr = "";
        var data = dataOb.data;
        var table = dataOb.table;
        var index = dataOb.index;

        for (k in data) {
            valueStr += k + '=' + '"' + data[k] + '"' + ",";
        }
        for (k in index) {
            keyStr += k + '=' + '"' + index[k] + '"' + ",";
        }

        keyStr = keyStr.slice(0, keyStr.length - 1);
        valueStr = valueStr.slice(0, valueStr.length - 1);

        var sql = 'UPDATE ' + _db + "." + table + ' SET ' + valueStr + ' WHERE ' + keyStr;
        return sql;
    }

    function createDeleteSql(dataOb) {
        var keyStr = "";
        var valueStr = "";
        var table = dataOb.table;
        var index = dataOb.index;


        for (k in index) {
            keyStr += k + '=' + '"' + index[k] + '"' + ",";
        }

        keyStr = keyStr.slice(0, keyStr.length - 1);
        valueStr = valueStr.slice(0, valueStr.length - 1);

// “DELETE FROM `t_accounts` WHERE `t_accounts`.`account` = \'123\'”

        var sql = 'DELETE FROM ' + _db + "." + table + ' WHERE ' + keyStr;
        return sql;
    }
    var callBack;
    return {
        query: function(sql) {
            return query(sql);
        },
        insert: function(dataOb) {
            var sql = createInsertSql(dataOb);
            return query(sql);
        },
        select: function(dataOb) {
            var sql = createSelectSql(dataOb);
            return query(sql);
        },
        update: function(dataOb) {
            var sql = createUpdateSql(dataOb);
            return query(sql);
        },
        delete:function(dataOb){
          var sql = createDeleteSql(dataOb);
          return query(sql);
        }
    }
}
