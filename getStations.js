let fs = require('fs');

// let citys = require('./result.js');
// let PY = require('./py.js');
// let utils = require('./utils.js')
let request = require('request');
let cheerio = require('cheerio');
let citys = require('./fuck.js');
let utils = require("./utils.js");

// let citys = [{
//     "code": "110000",
//     "sheng": "11",
//     "di": "00",
//     "xian": "00",
//     "name": "北京",
//     "station": [{
//             "station_id": "1167",
//             "city_name": "北京",
//             "station_name": "四惠客运站",
//             "station_pinyin": "sihuikeyunzhan"
//         },
//         {
//             "station_id": "1165",
//             "city_name": "北京",
//             "station_name": "莲花池客运站",
//             "station_pinyin": "lianhuachikeyunzhan"
//         },
//         {
//             "station_id": "1166",
//             "city_name": "北京",
//             "station_name": "北郊客运站",
//             "station_pinyin": "beijiaokeyunzhan"
//         },
//         {
//             "station_id": "1162",
//             "city_name": "北京",
//             "station_name": "赵公口客运站",
//             "station_pinyin": "zhaogongkoukeyunzhan"
//         },
//         {
//             "station_id": "1164",
//             "city_name": "北京",
//             "station_name": "永定门客运站",
//             "station_pinyin": "yongdingmenkeyunzhan"
//         },
//         {
//             "station_id": "1163",
//             "city_name": "北京",
//             "station_name": "新发地客运站",
//             "station_pinyin": "xinfadikeyunzhan"
//         },
//         {
//             "station_id": "20831",
//             "city_name": "北京",
//             "station_name": "木樨园才华长途客运站",
//             "station_pinyin": "muxiyuancaihuachangtukeyunzhan"
//         },
//         {
//             "station_id": "1409",
//             "city_name": "北京",
//             "station_name": "首都机场站",
//             "station_pinyin": "shoudujichangzhan"
//         },
//         {
//             "station_id": "1169",
//             "city_name": "北京",
//             "station_name": "丽泽客运站",
//             "station_pinyin": "lizekeyunzhan"
//         },
//         {
//             "station_id": "1161",
//             "city_name": "北京",
//             "station_name": "六里桥客运站",
//             "station_pinyin": "liuliqiaokeyunzhan"
//         },
//         {
//             "station_id": "20530",
//             "city_name": "北京",
//             "station_name": "北京站配载站",
//             "station_pinyin": "beijingzhanpeizaizhan"
//         },
//         {
//             "station_id": "1173",
//             "city_name": "北京",
//             "station_name": "八王坟客运站",
//             "station_pinyin": "bawangfenkeyunzhan"
//         }
//     ],
//     "level": 1,
//     "pinyin": "beijing"
// }]
let StationIsNull = 0
process.env.UV_THREADPOOL_SIZE = 256;
citys.data.map((item, index) => {
    if (item.station) {
        item.station.map((station) => {
            if (station.station_addr === "") {
                StationIsNull++;
                console.log("这是第" + StationIsNull + "个")
                const uri = 'http://qiche.tieyou.com/' + item.pinyin + '-' + station.station_id + '/';
                const options = {
                    timeout: 150000,
                    agent: false,
                    headers: {

                    }
                };
                request(uri, options, (err, rep, body) => {
                    console.log("uri=================================", uri)
                    if (!err) {
                        let $ = cheerio.load(body);
                        let addr = $(".seo_txt_bg").children().eq(0).children('p').text();
                        console.log("addr:", addr)
                        station.station_addr = addr;
                        console.log("===================================车站查找完毕===============================")
                            // resolve(stations)
                    } else {
                        // reject(err)
                        console.log(err)
                    }
                }).on('error', (e) => {
                    console.log("e::", e)
                })
            }
        })
    } else {

    }
})

setTimeout(() => {
    utils.writeToFile(citys.data);
}, 1000 * 60 * 2)

// (function() {
//     const uri = 'http://qiche.tieyou.com/tongchuan-1805/';
//     const options = {
//         timeout: 15000,
//         headers: {

//         }
//     };
//     request(uri, options, (err, rep, body) => {
//         if (!err) {
//             // console.log("body:", body)
//             let $ = cheerio.load(body);
//             let addr = $(".seo_txt_bg").children().eq(0).children('p').text();
//             console.log("addr:", addr)
//                 // resolve(stations)
//         } else {
//             // reject(err)
//             console.log(err)
//         }
//     }).on('error', (e) => {
//         console.log("e::", e)
//     })
// })()



// let city_list = citys.data.map((item) => {
//     item.pinyin = PY.convertPinyin(item.name)
//     return item;
//     // item.stations = [];
//     // if (item.name.length === 1) {
//     //     console.log(item.name)
//     //     item.name = item.name + "县";
//     //     item.pinyin = PY.convertPinyin(item.name)
//     //     return item;
//     // } else {
//     //     item.pinyin = PY.convertPinyin(item.name)
//     //     return item;
//     // }
// })

// utils.writeToFile(city_list);

// console.log(city_list);