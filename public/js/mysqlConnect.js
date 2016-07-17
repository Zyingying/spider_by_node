/* 
* @Author: Yingying
* @Date:   2016-07-04 00:27:29
* @Last Modified by:   Yingying
* @Last Modified time: 2016-07-18 00:40:10
*/
"use strict";
var main = document.querySelector('#main');

$.get('http://localhost:3000/', function(data) {
	/*optional stuff to do after success */
	console.log(data);
	insertTitle(data);
		 
});
// 思路：将数据插入页面 
// function draw(num,data){
// 	var div  = document.createElement("div"),
// 		node = document.createTextNode(data[num].Url);

// 	div.appendChild(node);
// 	var main = document.getElementById("main");
// 	element.appendChild(div);
// }

var insertTitle = function(data){
	let len = data.length,
	      i  ;
	for (i = data.length - 1; i >= 0; i--) {
		let title = data[i].Title,
	    	url  += 'http://zyingying.github.io/'+ data[i].Url;

	    $(".start").append('<div class="article"><a href="' + url + '">' + title + '</a></div>" ');
	};
}