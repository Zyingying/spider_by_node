var http = require("http");

var url = "http://zyingying.github.io/";
var data = "";

// 创建一个请求
var req = http.request(url, function(res){
    // 设置显示编码
    res.setEncoding("utf8");
    // 数据是 chunked 发送，意思就是一段一段发送过来的
    // 我们使用 data 给他们串接起来
    res.on('data', function(chunk){
        data += chunk;
    });
    // 响应完毕时间出发，输出 data
    res.on('end', function(){
        // dealData(data);
        data
        // console.log(data);
        // var reg = /<header\s+class="article-info clearfix">\s*<h1\s+itemprop="name">\s*<a\s+href=".+"\s+title=".+">/g;
        var reg = /<a(?= )[^>]* href=(['"])(\/\d{4}.*?)\1[^>]*\s*title=(['"])(.*)\s*itemprop=(['"])(.*)>.*<\/a>/g;
        var res = [];

        while(match = reg.exec(data)) {
           // console.log(match)   
            res.push({
                "url": match[2],
                "title": match[4]
                // "excerpt": match[3]
            });
        }
        console.log(res)
        console.log("1++++++++++"+res[0].url)
                       
        console.log("2+++++++++++++++++"+res[0].title) ;
        // var i=res.length-1;
        // // while(i >= 0) {
        //     var result = regHref.exec(res[0]);
        //     console.log(result);
        // //     i--;  
        // // }
        
    });
});


// 发送请求
req.end();




// var http = require("http");

// var url = "http://www.alloyteam.com/";
// var data = "";

// // 创建一个请求
// var req = http.request(url, function(res){
//     // 设置显示编码
//     res.setEncoding("utf8");
//     // 数据是 chunked 发送，意思就是一段一段发送过来的
//     // 我们使用 data 给他们串接起来
//     res.on('data', function(chunk){
//         data += chunk;
//     });
//     // 响应完毕时间出发，输出 data
//     res.on('end', function(){
//         // dealData(data);
//         var reg = /<ul\s+class="articlemenu">\s+<li>\s+<a[^>]*>.*?<\/a>\s+<a href="(.*?)"[^>]*>(.*?)<\/a>[\s\S]*?<div\s+class="text">([\s\S]*?)<\/div>/g;
//         var res = [];
//         while(match = reg.exec(data)) {

//             res.push({
//                 "url": match[1],
//                 "title": match[2],
//                 "excerpt": match[3]
//             });

//         }
//         console.log(res);
//     });
// });


// // 发送请求
// req.end();