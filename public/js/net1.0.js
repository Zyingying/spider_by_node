/* 
 * @Author: Yingying
 * @Date:   2016-05-24 23:45:59
 * @Last Modified by:   Yingying
 * @Last Modified time: 2016-07-03 17:11:07
 */

// mysql模块
var mysql = require('mysql');
// http模块
var http = require("http");
// 需要爬的网站
var url = "http://zyingying.github.io/";
var data = "";

// 创建一个请求
var req = http.request(url, function(res) {
  // 设置显示编码
  res.setEncoding("utf8");
  // 数据是 chunked 发送，意思就是一段一段发送过来的
  // 我们使用 data 给他们串接起来
  res.on('data', function(chunk) {
    data += chunk;
  });
  // 响应完毕时间出发，输出 data
  res.on('end', function() {
    // dealData(data);
    // data是页面的代码
    // console.log(data);

    var reg = /<a(?= )[^>]* href=(['"])(\/\d{4}.*?)\1[^>]*\s*title=(['"])(.*)\s*itemprop=(['"])(.*)>.*<\/a>/g;
    var res = [];

    while (match = reg.exec(data)) {
      // console.log(match)   
      res.push({
        // match[2]是匹配出来的url
        "Url": match[2],
        "Title": match[4]
          // "excerpt": match[3]
      });
    }
    console.log(res)
    console.log("1++++++++++" + res[0].Url)
    console.log("2+++++++++++++++++" + res[0].Title);
connectMysql().connection.connect();
    // var arrUrl =[];
          // connectMysql().SelectData(res[0].Url, res[0].Title);
    for (var j = 0; j < res.length; j++) {
      // console.log(res[j].Url);
      // connectMysql().Insert([res[j].Title, res[j].Url]);
      connectMysql().SelectData(res[j].Url, res[j].Title);
      // SelectData;
      // arrUrl.push(res[j].Url);

    }
connectMysql().connection.end();
  });
});

// 发送请求
req.end();



var connectMysql = function() {
  // 连接数据库的函数，里面包括四个函数：增删查改

  var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password : 'root',
    database : 'nodesample'
  });

  //查询
  function SelectData(Url, num) {
      // var Url = '我们使用是是是是'        
      // 查询
      var  userGetSql = 'SELECT * FROM catalog  WHERE Url = \''+ Url +'\' ';
           
      // var  userGetSql = 'SELECT Url FROM catalog ';

      // 查
      connection.query(userGetSql, function(err, result) {
        if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result, num);
          if(result.length == 0 ) return; //查询不到 
            if (result[0].Url == Url) {
              console.log("true");

            } else {
              console.log("xxx");

              // Insert(result[num]);
            }
        // console.log(result == false);    
        console.log('----------------------------------------------------------------\n\n');
      });
    }
    // SelectData(num);

  // 增加
  function Insert(data) {
    var userAddSql = 'INSERT INTO catalog(Title,Url) VALUES(?,?)';
    // var  userAddSql_Params = ['lwy','456'];
    var userAddSql_Params = data;

    // //增
    connection.query(userAddSql, userAddSql_Params, function(err, result) {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
      }

      console.log('--------------------------INSERT----------------------------');
      //console.log('INSERT ID:',result.insertId);        
      console.log('INSERT ID:\n', result);
      console.log('-----------------------------------------------------------------\n\n');
    });
  }


  // 更新
  function Update() {

    var userModSql = 'UPDATE catalog SET ID = ? ,Title = ? WHERE Url = ?';
    var userModSql_Params = [0, 'lwy', '66678'];
    //改
    connection.query(userModSql, userModSql_Params, function(err, result) {
      if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
      }
      console.log('--------------------------UPDATE----------------------------');
      console.log('UPDATE affectedRows', result.affectedRows);
      console.log('-----------------------------------------------------------------\n\n');
    });
  }



  function Delete() {
    var userDelSql = 'DELETE FROM catalog';
    //删
    connection.query(userDelSql, function(err, result) {
      if (err) {
        console.log('[DELETE ERROR] - ', err.message);
        return;
      }

      console.log('--------------------------DELETE----------------------------');
      console.log('DELETE affectedRows', result.affectedRows);
      console.log('-----------------------------------------------------------------\n\n');
    });
  }



  return {
    connection: connection,
    SelectData: SelectData,
    Insert: Insert
  }
  
}