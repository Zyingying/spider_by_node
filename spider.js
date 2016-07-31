/* 
* @Author: Yingying
* @Date:   2016-05-24 23:45:59
* @Last Modified by:   Yingying
* @Last Modified time: 2016-08-01 00:26:24

*/

"use strict";
// mysql模块
var mysql  = require('mysql');  
// http模块
var http = require("http");
// 开启路由
var express = require('express');
var app = express();
// 需要爬的网站
var url    =  "http://zyingying.github.io",
	author =  "zyingying",
	data   =  "" ;
		// 连接池
var connection = mysql.createConnection({     
			host     : '127.0.0.1',
			user     : 'root',
			password : 'root',
			database : 'nodesample'
}); 

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
				
				// data是页面的代码
				var reg = /<a(?= )[^>]* href=(['"])(\/\d{4}.*?)\1[^>]*\s*title=(['"])(.*)\s*itemprop=(['"])(.*)>.*<\/a>/g;
				var res = [],
						match;

				while(match = reg.exec(data)) {
					 // console.log(match)   
						res.push({
								"Url": match[2],
								"Title": match[4]
						});
				}
				console.log(res);
				// main(res);
				
				// }
				// connection.end();
		});
});

// 发送请求
req.end();

	
 
// 将功能抽离
const query = (userGetSql,options,fun,userAddSql_Params) => {

	if (userAddSql_Params === undefined) {

		connection.query(userGetSql,function (err, result) {
				if(err){
					console.log(options +'- ',err.message);
					return;
				}        
				console.log('result----->',result);
				fun(null, result);
		});
	}
	if(fun == undefined){

		connection.query(userGetSql,userModSql_Params,function (err, result) {
				if(err){
					console.log(options +'- ',err.message);
					return;
				}        
				console.log('result----->',result);
				
		});
	}
	
}




const main = (data) => {
	
	console.log('++++++++++++++++++++++++++++++++++++++',data)
	let len = data.length,j;

	for(j = 0 ; j < len; j++){


			//查询是否有重复的东西
			let sql =  'SELECT * FROM catalog WHERE Url = \'' + data.Url + ' \'';
			
			query(sql,"SelectData",function(err, result){
				if (result.length !== 0) {
						//log: 取对象属性的时候,注意判断是否有值 
						// 数据库中有相同的东西，更新
						sql = 'UPDATE catalog SET Author = ? ,Title = ? WHERE Url = ?'
						
						!data && !data[j].Title && query(userGetSql,"update",undefined,[author,data[j].Title,data[j].Url]);
				}else{
						// 找不到相同的数据，则是新数据，插入到数据库中
						sql = 'INSERT INTO catalog(Author,Title,Url) VALUES(?,?,?)';
						query(userGetSql,"insert",undefined,[author,data[j].Title,data[j].Url]);
						// Insert(data[j]);
				}
			});
			
	}
		
	app.use('/', express.static('public'));

	app.get('/', function (req, res) {
			SelectAll(function(err, result) {
				res.send(result);
			});
	});

	app.listen(3000, function () {
	    console.log('Example app listening on port 3000!');
	});  
}


const SelectAll = (done) => {
	// 查询
	var  userGetSql = 'SELECT * FROM catalog ';
	// 查
	connection.query(userGetSql,function (err, result) {
			if(err){
				console.log('[SELECT ERROR] - ',err.message);
				return done(err);
			}        

			console.log('--------------------------SELECT----------------------------');
			console.log('result----->',result);

			done(null, result);
					
	});
}

