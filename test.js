// let request = require('request');
let cheerio = require('cheerio');
let rp = require('request-promise');

let fs = require('fs');

let PY = require('./py.js');
let citys = require('./citys.js');
let city_list = citys.data.map((item) => {
    if (item.name.length === 1) {
        console.log(item.name)
        item.name = item.name + "县";
        item.pinyin = PY.convertPinyin(item.name)
        return item;
    } else {
        item.pinyin = PY.convertPinyin(item.name)
        return item;
    }
})

//转换层级关系




/**
 *将变量写入js文件 
 */
function writeToFile(args) {
    var data = typeof args == "string" ? args : JSON.stringify(args)
    var writerStream = fs.createWriteStream('output.js');
    writerStream.write(data, 'UTF8');
    // 标记文件末尾
    writerStream.end();
    // 处理流事件 --> data, end, and error
    writerStream.on('finish', function() {
        console.log("写入完成。");
    });

    writerStream.on('error', function(err) {
        console.log(err.stack);
    });
}


// const url = "http://qiche.tieyou.com/pj_chengdu-mianyang/?date=2017-05-18"
//根据两个城市获取车站信息

function getBusStation(start, end) {
    let options = {
        uri: 'http://qiche.tieyou.com/pj_' + start + '-' + end,
        transform: function(body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(function($) {
            // console.log($)
            $("#fromStation>span>label")
                .each((index, item) => {
                    console.log("车站:", $(item).text())
                })
        })
        .catch(function(err) {
            // Crawling failed or Cheerio choked...
            console.error(err)
        });
}
// getBusStation('chengdu', 'mianyang')
getBusStation('beijing', 'tianjin')