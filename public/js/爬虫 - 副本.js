/* 
* @Author: Yingying
* @Date:   2016-05-24 23:45:59
* @Last Modified by:   Yingying
* @Last Modified time: 2016-07-03 16:14:27
*/

var mysql  = require('mysql');  

var connection = mysql.createConnection({     
      host     : '127.0.0.1',
      user     : 'root',
      password : 'root',
      database : 'nodesample'
}); 


connection.connect();

// connection.query('USE '+TEST_DATABASE);
 
// connection.query(
//     'CREATE TABLE Catalog'+
//     '(Title varchar(255) ,'+
//     'Url varchar(255) NOT NULL,'+
//     'UNIQUE (Title),'+
//     'UNIQUE (Url));'
// );
// CREATE TABLE Catalog
// (ID int NOT NULL,  
// Title varchar(255) ,
// Url varchar(255) NOT NULL,
// PRIMARY KEY (Url));
// UNIQUE (Title),
// UNIQUE (Url));

// 增加
function Insert(){
    var  userAddSql = 'INSERT INTO catalog(Title,Url) VALUES(?,?)';
    // var  userAddSql_Params = ['lwy','456'];
    var  userAddSql_Params = ['zyy', '66678'];

    // //增
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
}


// 更新
function Update(){

    var userModSql = 'UPDATE catalog SET ID = ? ,Title = ? WHERE Url = ?';
    var userModSql_Params = [0,'lwy', '66678'];
    //改
    connection.query(userModSql,userModSql_Params,function (err, result) {
       if(err){
             console.log('[UPDATE ERROR] - ',err.message);
             return;
       }        
      console.log('--------------------------UPDATE----------------------------');
      console.log('UPDATE affectedRows',result.affectedRows);
      console.log('-----------------------------------------------------------------\n\n');
    });
}


//查询
function Select(){
    // 查询
    var  userGetSql = 'SELECT Url FROM catalog WHERE Url = 66678';
    // 查
    connection.query(userGetSql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }        

           console.log('--------------------------SELECT----------------------------');
           console.log(result);        
           console.log('-----------------------------------------------------------------\n\n');  
    });
}
Select();

function Delete(){
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


connection.end();