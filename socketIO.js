var net = require('net');

// var HOST = '127.0.0.1';
// var PORT = 6967;




// 为客户端添加“data”事件处理函数
// data是服务器发回的数据


// // 为客户端添加“close”事件处理函数
// client.on('close', function() {
//     console.log('Connection closed');
// });

module.exports = function() {
    var client = new net.Socket();
    var buffer = "";
    var fn = new Function();
    return {
        display: function() {
            console.log(123);
        },
        connect: function(PORT, HOST) {
            client.connect(PORT, HOST, function() {
                client.write(buffer);
            });
            return this;
        },
        write: function(str) {
            buffer = str;
            return this;
        },
        then: function(f) {
            fn = f;
            client.on('data', function(data) {

                fn(data);
                // 完全关闭连接
                client.destroy();

            });
            return this;
        }
    }
}
