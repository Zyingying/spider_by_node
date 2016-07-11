/* 
* @Author: Yingying
* @Date:   2016-05-08 09:51:35
* @Last Modified by:   Yingying
* @Last Modified time: 2016-05-08 09:55:24
*/

var Bagpipe = require('bagpipe');
var bagpipe = new Bagpipe(10);
for(var i = 0; i < 100; i++){
    bagpipe.push(async,function(){
        console.log('执行回调');
             
    })
}
bagpipe.on('full',function(length){
    console.warn("队列拥堵，目前队列长度为"+length);
})