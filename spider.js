/* 
* @Author: Yingying
* @Date:   2016-05-24 23:45:59
* @Last Modified by:   Marte
* @Last Modified time: 2016-07-14 11:28:21
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
				// console.log(res);
				console.log("1++++++++++"+res[0].Url)                      
				console.log("2+++++++++++++++++"+res[0].Title) ;
				let len = res.length;
				for(let j = 0; j < len; j++){
					SelectData(res[j]);
				}
				// connection.end();
		});
});

// 发送请求
req.end();


// var connectMysql = function(){
// 连接数据库的函数，里面包括四个函数：增删查改

		var connection = mysql.createConnection({     
					host     : '127.0.0.1',
					user     : 'root',
					password : 'root',
					database : 'nodesample'
		}); 

		connection.connect();

			//查询
			const SelectData = (data) => {
					// 查询
					var  userGetSql = 'SELECT * FROM catalog WHERE Url = \'' + data.Url + ' \'';
					console.log(userGetSql);
					// 查
					connection.query(userGetSql,function (err, result) {
									if(err){
										console.log('[SELECT ERROR] - ',err.message);
										return;
									}        
								 console.log('--------------------------SELECT----------------------------');
								 console.log('result----->',result);
								 if (result.length !== 0) {
											// 数据库中有相同的东西，更新
											Update(author,data.Title,data.Url);
								 }else{
										// 找不到相同的数据，则是新数据，插入到数据库中
											Insert(data);
								 }
					});
			}

		// 增加
		const Insert = (data) => {
				var  userAddSql = 'INSERT INTO catalog(Author,Title,Url) VALUES(?,?,?)';
				var  userAddSql_Params = [author,data.Title,data.Url];
				console.log('插入数据中。。。。',userAddSql_Params);
				// //增
				connection.query(userAddSql,userAddSql_Params,function (err, result) {
								if(err){
								 console.log('[INSERT ERROR] - ',err.message);
								 return;
								}        
							 console.log('--------------------------INSERT----------------------------');
							 console.log('INSERT ID:\n',result);        
							 console.log('-----------------------------------------------------------------\n\n');  
				});
				
		}


		// 更新
		const Update = (author,title,url) => {

				var userModSql = 'UPDATE catalog SET Author = ? ,Title = ? WHERE Url = ?';
				var userModSql_Params = [author,title,url];
				//改
				connection.query(userModSql,userModSql_Params,function (err, result) {
					 if(err){
								 console.log('[UPDATE ERROR] - ',err.message);
								 return;
					 }        
					console.log('--------------------------UPDATE----------------------------');
					console.log('UPDATE affectedRows',result.affectedRows);
					// console.log('-----------------------------------------------------------------\n\n');
				});
		}

		const Delete = () => {

				var  userDelSql = 'DELETE FROM catalog';
				//删
				connection.query(userDelSql,function (err, result) {
								if(err){
									console.log('[DELETE ERROR] - ',err.message);
									return;
								}        
							 console.log('--------------------------DELETE----------------------------');
							 console.log('DELETE affectedRows',result.affectedRows);
							 console.log('-----------------------------------------------------------------\n\n');  
				});
		}
	 
																								 
	 	const SelectAll = () => {
				// 查询
				var  userGetSql = 'SELECT * FROM catalog  ';
				// 查
				connection.query(userGetSql,function (err, result) {
								if(err){
									console.log('[SELECT ERROR] - ',err.message);
									return;
								}        

							 console.log('--------------------------SELECT----------------------------');
							 console.log('result----->',result);

							 app.use('/', express.static('public'));

							 app.get('/', function (req, res) {
									 res.send(result);
							 });

							 app.listen(3000, function () {
									 console.log('Example app listening on port 3000!');
							 }); 
								
							// connectMysql();
				});
		}

SelectAll();
	// 获取所有的数据到前端
	

// app.use('/', express.static('public'));

// app.get('/', function (req, res) {
//     res.send("123");
// });

// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
// });  

// connection.end();
