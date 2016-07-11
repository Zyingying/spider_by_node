/**
 * NodeJs爬虫实例，爬imooc*/

var http = require('http');
//安装cheerio，并引入进来
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

function filterChapter(html) {
    var $ = cheerio.load(html);
    var chapters = $('.chapter');

    //[{
    //    chapterTitle: '',
    //    videos: [
    //        title: '',
    //        id: ''
    //    ]
    //}]

    var courseData = [];

    chapters.each(function (item) {
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').text();
        var videos = chapter.find('.video').children('li');

        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        };

        videos.each(function (item) {
            var video = $(this).find('a');
            var videoTitle = video.text();
            var id = video.attr('href');

            chapterData.videos.push({
                videoTitle: videoTitle,
                id: id
            });
        });
        //console.log(chapterData);

        courseData.push(chapterData);
    });
    //console.log(courseData);
    //console.log(courseData.videos);

    /*courseData.forEach(function (item) {
        //console.log(item.videos);
        var videoTitle = item.videos[0].videoTitle;
        var id = item.videos[0].id;
        console.log('[' + id + ']' + videoTitle);
    });*/

    return courseData;
}

function printCourseInfo(courseData) {
    // courseData是一个数组
    courseData.forEach(function (item) {
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + '\n');
    });

    courseData.forEach(function (item) {
        var videoTitle = item.videos[0].videoTitle;
        var id = item.videos[0].id;
        console.log('[' + id + ']' + videoTitle);
    });
    //console.log('test');
    //console.log(courseData.videos);
}

http.get(url, function (response) {
    var html = '';

    response.on('data', function (data) {
        html += data;
    });

    response.on('end', function () {
        var courseData = filterChapter(html);

        printCourseInfo(courseData);
        //console.log(courseData);
    });
}).on('error', function () {
    console.log('获取课程数据出错');
});