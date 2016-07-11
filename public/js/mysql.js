/* 
* @Author: Yingying
* @Date:   2016-05-24 23:45:59
* @Last Modified by:   Yingying
* @Last Modified time: 2016-07-04 01:28:03
*/

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'root',
//   password : 'root',
//   database : 'nodesample'
// });

// connection.connect(function(err){
//     if(err){        
//           console.log('[query] - :'+err);
//         return;
//     }
//       console.log('[connection connect]  succeed!');
// }); 

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });

// //关闭connection
// connection.end(function(err){
//     if(err){        
//         return;
//     }
//       console.log('[connection end] succeed!');
// });


var mysql  = require('mysql');  

var connection = mysql.createConnection({     
      host     : '127.0.0.1',
      user     : 'root',
      password : 'root',
      database : 'nodesample'
}); 

connection.connect();

var  userAddSql = 'INSERT INTO userinfo(Id,UserName,UserPass) VALUES(0,?,?)';
var  userAddSql_Params = ['zyyy', 'lwy'];
//增
connection.query(userAddSql,userAddSql_Params,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        

       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:\n',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});


// 更新
// var userModSql = 'UPDATE userinfo SET UserName = ?,UserPass = ? WHERE Id = ?';
// var userModSql_Params = ['lwy', '456',0];
// //改
// connection.query(userModSql,userModSql_Params,function (err, result) {
//    if(err){
//          console.log('[UPDATE ERROR] - ',err.message);
//          return;
//    }        
//   console.log('--------------------------UPDATE----------------------------');
//   console.log('UPDATE affectedRows',result.affectedRows);
//   console.log('-----------------------------------------------------------------\n\n');
// });

// 查询
// var  userGetSql = 'SELECT * FROM userinfo';
//查
// connection.query(userGetSql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }        

//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);        
//        console.log('-----------------------------------------------------------------\n\n');  
// });


// var  userDelSql = 'DELETE FROM userinfo';
// //删
// connection.query(userDelSql,function (err, result) {
//         if(err){
//           console.log('[DELETE ERROR] - ',err.message);
//           return;
//         }        

//        console.log('--------------------------DELETE----------------------------');
//        console.log('DELETE affectedRows',result.affectedRows);
//        console.log('-----------------------------------------------------------------\n\n');  
// });

connection.end();
