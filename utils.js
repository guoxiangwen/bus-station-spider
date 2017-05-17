/**
 *将变量写入js文件 
 */
let fs = require('fs');

exports.writeToFile = (args) => {
    var data = typeof args == "string" ? args : JSON.stringify(args)
    var writerStream = fs.createWriteStream('xxxx.js');
    writerStream.write(data, 'UTF8');
    // 标记文件末尾
    writerStream.end();
    // 处理流事件 --> data, end, and error
    writerStream.on('finish', function() {
        console.log("写入完成。");
        process.exit(0)
    });

    writerStream.on('error', function(err) {
        console.log(err.stack);
    });
}