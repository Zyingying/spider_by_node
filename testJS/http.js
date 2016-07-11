/* 
* @Author: Yingying
* @Date:   2016-05-09 11:01:57
* @Last Modified by:   Yingying
* @Last Modified time: 2016-05-10 00:17:30
*/
var http = require('http');

// http.createServer(function(req,res){
//         res.writeHead(200,{'Content-Type':'text/plain'});
//         res.end('hello world\n');
// }).listen(1300,'127.0.0.1');
// console.log('server running at http://127.0.0.1:1300/');


var options = {
    hostname : 'www.google.cn',
    port :80,
    path :'/',
    method :'GET'
};

var req = http.request(options,function(res){
    console.log('status' + res.statusCode);
    console.log('headers' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data',function(chuck){
        // console.log(chuck);
             
    });      
});

req.on("error", function(e){
    console.log(e)
})


req.end();
// 
// 
// var options = {
//         hostname: 'www.example.com',
//         port: 80,
//         path: '/upload',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };

// var request = http.request(options, function (response) {
//     // console.log(response);
         
// });

// request.write('Hello World');
// request.end();