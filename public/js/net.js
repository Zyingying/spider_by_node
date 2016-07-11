/* 
* @Author: Yingying
* @Date:   2016-05-08 23:35:36
* @Last Modified by:   Yingying
* @Last Modified time: 2016-05-09 01:21:27
*/

var net = require('net');
var server = net.createServer(function(socket){
    socket.on('data',function(data){
        socket.write("hello");
        // socket.end();
    });
    // socket.on('end',function(data){
    //     console.log("连接断开");
             
    // });
    socket.on('err',function(data){
        console.log("连接断开");
             
    });
    socket.write("盈盈好腻害\n");
});

server.listen(8124,function(){
    console.log('server bound');
         
});

// var server = net.createServer();
// server.on('connection',function(socket){
//     //haha
// });
// server.listen(8124);
