const data = [{
        name: "北京"
    },
    {
        name: "天津"
    },
    {
        name: "重庆"
    }
]

data.map((item) => {
    setTimeout(() => {
        item.pinyin = "fuck";
        console.log(data)

    }, 1000)

})