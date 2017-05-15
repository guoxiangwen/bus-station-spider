let request = require('request');
let cheerio = require('cheerio');
let rp = require('request-promise');

let fs = require('fs');

let PY = require('./py.js');
let citys = require('./citys.js');

let utils = require('./utils.js')

let city_list = citys.data.map((item) => {
    // item.stations = [];
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

//返回level:2的城市


//转换层级关系







// const url = "http://qiche.tieyou.com/pj_chengdu-mianyang/?date=2017-05-18"
//根据两个城市获取车站信息

function getBusStation(province, city) {
    let stations = [];
    // let uri = 'http://qiche.tieyou.com/pj_' + start + '-' + end;
    let uri = "http://qiche.tieyou.com/tieyouBusSeo/index.php?param=/station/getStationList.html&rand=4&province=" + province + "&city=" + city;

    const options = {
        timeout: 15000,
        headers: {

        }
    }
    return new Promise((resolve, reject) => {
        request(uri, options, (err, rep, body) => {
            if (!err) {
                console.log("body:", body)
                    // let $ = cheerio.load(body);
                    //     $("#fromStation>span>label")
                    //     .each(function(index, item) {
                    //         console.log("车站:", $(item).text());
                    //         stations.push($(item).text());
                    //     }, this)
                    // resolve(stations)
            } else {
                // reject(err)
                console.log(err)
            }
        }).on('error', (e) => {
            console.log("e::", e)
        })
    })

}
(async function AddStations() {
    //1.直辖市
    //todo
    //2.非直辖市
    let level2 = city_list.filter((item) => {
        return item.level === 2;
    })
    let level3 = city_list.filter((item) => {
            return item.level === 3;
        })
        //给level2城市加station

    for (let i = 0; i < level2.length; i++) {
        // console.log("item::::", item);
        // if (item.sheng)
        let stations = await getBusStation(level2[i].pinyin, level2[i + 1].pinyin);
        console.log(level2[i].name, stations);
        level2[i].stations = stations;
    }
    // for (let j = 0; j < level3.length; j++) {
    //     // console.log("item::::", item);
    //     // if (item.sheng)
    //     let stations = await getBusStation(level3[j].pinyin, level3[j + 1].pinyin);
    //     console.log("得到的stations:", stations);
    //     level3[j].stations = stations;
    // }
    let all_list = level2.concat(level3);

    utils.writeToFile(all_list);
    // return all_list;


    // let stations = await getBusStation(start, end);
})()


// getBusStation('chengdu', 'mianyang')
// AddStations().then(res => {
//     console.log("res=====================================", res)
//         // console.log("level2", level2)
// });