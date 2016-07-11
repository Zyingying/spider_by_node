/* 
* @Author: Yingying
* @Date:   2016-07-04 00:27:29
* @Last Modified by:   Yingying
* @Last Modified time: 2016-07-08 10:13:15
*/
var main = document.querySelector('#main');

$.get('http://localhost:3000/', function(data) {
    /*optional stuff to do after success */
    console.log(data);
    
         
});

function draw(num,data){
    var div  = document.createElement("div"),
        node = document.createTextNode(data[num].Url);

    div.appendChild(node);

    var main = document.getElementById("main");
    element.appendChild(div);
}