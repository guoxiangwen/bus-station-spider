let fs = require('fs');

let list = [
    { name: 'fuckman' },
    { name: 'fuckman1' },
    { name: 'fuckman2' },
    { name: 'fuckman3' },
    { name: 'fuckman4' },
    { name: 'fuckman5' },
    { name: 'fuckman6' },
    { name: 'fuckman7' },

];
// var buffer = new Buffer(JSON.stringify(data))
var data = JSON.stringify(list)
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

console.log("程序执行完毕");

// fs.createWriteStream().write()